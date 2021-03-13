const nim = require('@nimbella/sdk'),
      needle = require('needle')

function subtractShares(rc, account_id, ticker, shares) {
  const sharesKey = 'trade_demo_shares/' + account_id + '/' + ticker
  return rc.decrbyAsync(sharesKey, shares).then(function() {
    return { status: "complete" }
  })
}

function addBalance(rc, account_id, amount) {
  const balanceKey = 'trade_demo_balance/' + account_id
  return  rc.incrbyfloatAsync(balanceKey, amount).then(function(balance) {
    return balance
  })
}

function getSharesOwned(rc, account_id, ticker) {
  const sharesKey = 'trade_demo_shares/' + account_id + '/' + ticker
  return rc.getAsync(sharesKey).then(function(numShares) {
    return numShares
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
    return getSharesOwned(rc, account_id, ticker).then(function(ownedShares) {
      if (ownedShares - shares < 0) {
        return { "status": "failed, not enough owned shares" }
      }
      return subtractShares(rc, account_id, ticker, shares).then(function() {
        return addBalance(rc, account_id, shares * price).then(function(status) {
          return { status: "complete" }
        })
      })
    })
  })
}
