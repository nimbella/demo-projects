const needle = require('needle')

function main(params) {
  let apitoken = params.apitoken
  let ticker = params.ticker.toUpperCase()

  let func = `https://cloud.iexapis.com/stable/stock/market/batch?token=${apitoken}&types=stats,quote,company&symbols=`

  return needle('get', func + ticker)
    .then(function(response) {
      let r = response.body[ticker]
      return {
        ticker: ticker,
        desc: r.company.description,
        gain: r.quote.change,
        gainP: r.quote.changePercent,
        prevClose: r.quote.previousClose,
        open: r.quote.open,
        close: r.quote.close,
        peR: r.quote.peRatio,
        divY: r.stats.dividendYield,
        mktCap: r.quote.marketCap,
        volume: r.quote.latestVolume,
        aveVolume: r.quote.avgTotalVolume,
        wkH: r.quote.week52High,
        wkL: r.quote.week52Low
     }
    })
    .catch(function(err) {
      return { "status": "failed, " + err }
    })
}
