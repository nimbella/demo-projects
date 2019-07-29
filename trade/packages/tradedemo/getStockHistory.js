function main(params) {
  let apitoken = params.apitoken
  let ticker = params.ticker.toUpperCase()

  let func = `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1y?token=${apitoken}`
  var needle = require('needle')
  return needle('get', func)
    .then(function(response) {
      return { prices: response.body }
    })
    .catch(function(err) {
      return { "status": "failed, " + err }
    })
}
