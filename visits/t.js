const nimbella = require('@nimbella/sdk')
const kv = nimbella.redis()

const main = async args => {
    const count = await kv.incrAsync('page-visits')
    return { 'body': count }
}

