const nim = require('nim'),
      needle = require('needle')

function addShares(rc, account_id, ticker, shares) {
  const sharesKey = 'trade_demo_shares/' + account_id + '/' + ticker

  // does shares key already exist in db?
  return rc.getAsync(sharesKey).then(function(sharesKeyExists) {
    // increment the existing number of shares, will create if it doesn't exist
    return rc.incrbyAsync(sharesKey, shares).then(function() {
      if (sharesKeyExists != undefined) {
        return { status: "complete" }
      }
      // add ticker to stock list
      const stockListKey = 'trade_demo_stock_list/' + account_id
      return rc.rpushAsync(stockListKey, ticker).then(function() {
        return { status: "complete" }
      })
    })
  })
}

function subtractBalance(rc, account_id, amount) {
  const balanceKey = 'trade_demo_balance/' + account_id
  return rc.incrbyfloatAsync(balanceKey, - amount).then(function(response) {
    return response
  })
}

function getBalance(rc, account_id) {
  const balanceKey = 'trade_demo_balance/' + account_id
  return rc.getAsync(balanceKey).then(function(balance) {
    return balance
  })
}

function getStockPrice(apitoken, ticker) {
  let func = `https://cloud.iexapis.com/stable/stock/market/batch?token=${apitoken}&types=quote&symbols=`
  return needle('get', func + ticker)
    .then(function(response) {
      return response.body[ticker].quote.latestPrice
    })
    .catch(function(err) {
      return { "status": "failed, " + err }
    })
}

function main(params) {
  let apitoken = params.apitoken
  let account_id = params.account_id
  let ticker = params.ticker.toUpperCase()
  let shares = params.shares

  if (apitoken == null || account_id == null || ticker == null || shares == null) {
    return { "status": "failed, a param is null" }
  }

  const rc = nim.redis()
  return getStockPrice(apitoken, ticker).then(function(price) {
    return getBalance(rc, account_id).then(function(balance) {
      let cost = shares * price
      if (balance - cost < 0) {
        console.log(`not enough money to acquire ${shares} shares of ${ticker}, need another $${cost - balance}`)
        return { "status": "failed, balance too low" }
      }
      console.log(`aquiring ${shares} shares of ${ticker} for total cost ${cost}`)
      return subtractBalance(rc, account_id, cost).then(function() {
        console.log('updated balance')
        return addShares(rc, account_id, ticker, shares).then(function(status) {
          console.log('added shares to account')
          return status
        })
      })
    })
  })
}
