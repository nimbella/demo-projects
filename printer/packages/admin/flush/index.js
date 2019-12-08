const nimbella = require('nim'),
      redis    = nimbella.redis()

function main(args) {
  if (args && args.flush) {
    return redis.flushallAsync('ASYNC').then(_ => {
      console.log(_)
      return { ok: 'flushed' }
    })
  } else return { ok: true }
}
