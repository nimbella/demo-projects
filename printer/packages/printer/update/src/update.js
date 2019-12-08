const nimbella = require('nim'),
      redis = nimbella.redis()

const response = (body, statusCode) => ({ statusCode: statusCode || 200, body })

function isValidStatus(status) {
    return status === 'created' || status === 'approved' || status === 'rejected'
}

function main(args) {
    if (args && args.id && isValidStatus(args.status)) {
        return redis
            .getAsync(args.id)
            .then(async (_) => {
                let form = JSON.parse(_)
                let fileId = form.id
                let newStatus = args.status
                let oldStatus = form.status
                form.status = newStatus
                return redis
                    .setAsync(fileId, JSON.stringify(form))
                    .then(_ => {
                        redis.sadd(newStatus, fileId)
                        redis.srem(oldStatus, fileId)
                        return response({
                            id: fileId,
                            filename: form.filename,
                            status: newStatus
                        })
                    })
            })
            .catch(error => {
                console.log(error)
                return response({ error: 'Invalid file id.' }, 404)
            })
    } else {
        return response({ error: 'File id and valid status required.' }, 400)
    }
}

module.exports = {
    main: main
}
