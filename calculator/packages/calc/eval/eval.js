const expeval = require('expression-eval')
const nim = require('nim')
const key = 'counter'

function main(args) {
    let expr = args['text']
    let result = evaluate(expr)
    let redis = nim.redis()
    return redis.getAsync(key)
      .then(reply => { return updateAndReply(redis, asCount(reply), result) })
      .catch(err =>  { return updateAndReply(redis, 0, result) } )
}

function evaluate(exprStr) {
    try {
        let ast = expeval.parse(exprStr)
        return expeval.eval(ast)
    } catch {
        return "error evaluating expression"
    }
}
function asCount(s) {
    if (Number.isInteger(s)) { return s }
    let v = parseInt(s, 10)
    return isNaN(v) ? 0 : v
}

function updateAndReply(redis, count, text) {
    return redis.setAsync(key, count+1)
      .then(reply => { return { count: count, result: text } })
      .catch(err =>  { return { count: count, result: text } })
}

exports.main = main
