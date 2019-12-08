const nimbella = require('nim'),
      redis = nimbella.redis()

const response = (body, statusCode) => ({ statusCode: statusCode || 200, body })

function isValidStatus(status) {
    return status === 'created' || status === 'approved' || status === 'rejected'
}

async function main(args) {
    let status = (args || {}).status
    if (isValidStatus(status)) {
        let list = {}
        list[status] = await redis.smembersAsync(status)
        return response(list)
    } else return response({ error: 'Valid status required.' }, 400)
}

module.exports = {
    main: main
}
