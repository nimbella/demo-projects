/*
 * Nimbella CONFIDENTIAL
 * ---------------------
 *
 *   2018 - present Nimbella Corp
 *   All Rights Reserved.
 *
 * NOTICE:
 *
 * All information contained herein is, and remains the property of
 * Nimbella Corp and its suppliers, if any.  The intellectual and technical
 * concepts contained herein are proprietary to Nimbella Corp and its
 * suppliers and may be covered by U.S. and Foreign Patents, patents
 * in process, and are protected by trade secret or copyright law.
 *
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Nimbella Corp.
 */

let kv = {}

function clearTimeout(k) {
  const x = kv[k]
  if (x && x.timer) {
    clearTimeout(x.timer)
  }
}

// https://redis.io/commands/flushall
const flushall = () => {
  kv = {}
  return Promise.resolve('OK')
}

// https://redis.io/commands/keys
const keys = (p) => {
  if (p) {
    if (p.substring(p.length - 1) === '*') p = p.slice(0, -1);
    return Object.keys(kv).filter(key => key.startsWith(p))
  }
  else { return Object.keys(kv); }
}

// https://redis.io/commands/get
const get = (k) => {
  if (k in kv) {
    return kv[k].value || kv[k]
  } else return null
}

// https://redis.io/commands/set
const set = (k, value) => {
  clearTimeout(k)
  kv[k] = { value }
  return 'OK'
}

// https://redis.io/commands/incr
const incr = (k) => {
  let c = get(k)
  if (c == null) {
    set(k, 1)
    return 1
  } else {
    c = c + 1
    set(k, c)
    return c
  }
}

// https://redis.io/commands/setex
const setex = (k, ttl, value) => {
  const res = set(k, value)
  expire(k, ttl)
  return res
}

// https://redis.io/commands/del
const del = (k) => {
  if (k in kv) {
    clearTimeout(k)
    delete kv.k
    return 1
  } else return 0
}

// https://redis.io/commands/expire
const expire = (k, t) => {
  if (k in kv) {
    clearTimeout(k)
    kv[k].timer = setTimeout(() => del(k), t * 1000)
    return 1
  } else return 0
}

// https://redis.io/commands/sadd
const sadd = (k, v) => {
  if (kv[k] === undefined) {
    kv[k] = new Set()
  }

  const s = kv[k]
  const n = s.size
  s.add(v)
  return s.size - n
}

// https://redis.io/commands/srem
const srem = (k, v) => {
  const s = kv[k]
  if (s !== undefined) {
    const n = s.size
    s.remove(v)
    return s.size - n
  } else return 0
}

// https://redis.io/commands/smembers
const smembers = (k) => {
  const s = kv[k]
  if (s) return Array.from(s.keys())
  else return []
}

// https://redis.io/commands/rpush
const rpush = (k, v) => {
  if (kv[k] === undefined) {
    kv[k] = []
  }

  const l = kv[k]
  l.push(v)
  return l.length
}

// https://redis.io/commands/lpush
const lpush = (k, v) => {
  if (kv[k] === undefined) {
    kv[k] = []
  }

  const l = kv[k]
  l.unshift(v)
  return l.length
}

// https://redis.io/commands/lrange
const lrange = (k, i, j) => {
  const l = kv[k]
  if (l !== undefined) {
    // TODO: this is not quite the same as redis
    return l.slice(i, j)
  } else return []
}

// https://redis.io/commands/llen
const llen = (k) => {
  const l = kv[k]
  if (l === undefined) {
    return 0
  } else if (Array.isArray(l)) {
    return l.length
  } else {
    throw new Error('not an array')
  }
}

module.exports = {
  redis: () => ({
    flushall,
    keys,
    get,
    set,
    incr,
    setex,
    del,
    expire,
    sadd,
    srem,
    smembers,
    rpush,
    lpush,
    lrange,
    llen,
    flushallAsync: flushall,
    keysAsync: (k) => Promise.resolve(keys(k)),
    getAsync: (k) => Promise.resolve(get(k)),
    setAsync: (k, v) => Promise.resolve(set(k, v)),
    incrAsync: (k) => Promise.resolve(incr(k)),
    setexAsync: (k, t, v) => Promise.resolve(setex(k, t, v)),
    delAsync: (k) => Promise.resolve(del(k)),
    expireAsync: (k, t) => Promise.resolve(expire(k, t)),
    smembersAsync: (s) => Promise.resolve(smembers(s)),
    rpushAsync: (k, v) => Promise.resolve(rpush(k, v)),
    lpushAsync: (k, v) => Promise.resolve(lpush(k, v)),
    lrangeAsync: (k, i, j) => Promise.resolve(lrange(k, i, j)),
    llenAsync: (k) => {
      try {
        const result = llen(k)
        return Promise.resolve(result)
      } catch (e) {
        return Promise.reject(e.message)
      }
    }
  }),
  storage: () => ({
    id: `bucket`,
    setMetadata: () => Promise.resolve({}),
    file: (filename) => ({
      getSignedUrl: (options) => Promise.resolve([`signed-${filename}-${options.action}`])
    })
  })
}
