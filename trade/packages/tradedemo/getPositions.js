const nim = require('@nimbella/sdk'),
      needle = require('needle')

function mergeTickerInfo(apitoken, tickerList, positions) {
  let tickerString = ""
  tickerList.forEach(function(ticker) {
    if (tickerString != "") {
      tickerString += ","
    }
    tickerString += ticker
  })
  if (tickerString == "") {
    return { positions: [] }
  }
  let func = `https://cloud.iexapis.com/stable/stock/market/batch?token=${apitoken}&types=quote&symbols=`
  return needle('get', func + tickerString)
    .then(function(response) {
      Object.keys(response.body).forEach(function(key) {
        value = response.body[key];
        positions[key].companyName = value.quote.companyName;
        positions[key].price = value.quote.latestPrice;
        positions[key].dayChange = value.quote.change;
        positions[key].dayChangePct = value.quote.changePercent;
      })
      // convert to array
      let a = [];
      Object.keys(positions).forEach(function(key) {
        positions[key].ticker = key
        a.push(positions[key])
      })
      return { positions: a }
    })
}

async function mergeNumShares(rc, account_id, tickerList) {
  let positions = {}
  let allPromises = []
  tickerList.forEach(async function(ticker) {
    const sharesKey = 'trade_demo_shares/' + account_id + '/' + ticker
    allPromises.push(rc.getAsync(sharesKey).then(function(numShares) {
      positions[ticker] = {}
      positions[ticker].numShares = numShares
    }))
  })
  await Promise.all(allPromises)
  return positions
}

function main(params) {
  let apitoken = params.apitoken
  let account_id = params.account_id

  if (account_id == null) {
    return { "status": "failed, account_id is null" }
  }

  const rc = nim.redis()
  let tickerString = ""

  const stockListKey = 'trade_demo_stock_list/' + account_id
  return rc.lrangeAsync(stockListKey, 0, -1).then(function(tickerList) {
    return mergeNumShares(rc, account_id, tickerList).then(function(positions) {
      return mergeTickerInfo(apitoken, tickerList, positions)
    })
  })
}
