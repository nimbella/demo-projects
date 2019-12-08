const uuidv4 = require('uuid/v4'),
      nimbella = require('nim'),
      redis = nimbella.redis()

async function getSignedUrl(filename) {
    const bucket = nimbella.storage()
    const file = bucket.file(filename)
    const expiration = 60 * 60 * 1000 // 60 minutes

    const putOptions = {
        version: 'v4',
        action: 'write',
        contentType: 'multipart/formdata; charset=UTF-8',
        expires: Date.now() + expiration
    }

    return file
        .getSignedUrl(putOptions)
        .then(_ => _[0])
}

const response = (body, statusCode) => ({ statusCode: statusCode || 200, body })

async function main(args) {
    if (args && args.filename) {
        const fileId = uuidv4()
        const signedPutUrl = await getSignedUrl(fileId)

        const form = {
            id: fileId,
            filename: args.filename,
            material: args.material,
            customer: args.customer,
            process: args.process,
            costEstimate: args.cost,
            timeEstimate: args.time,
            status: 'created'
        }

        return redis
            .setAsync(fileId, JSON.stringify(form))
            .then(_ => redis.sadd('created', fileId))
            .then(_ => response({
                id: fileId,
                filename: args.filename,
                status: 'created',
                signedPutUrl
            }))
            .catch(e => {
                console.error(e)
                return response({ error: 'Internal error.' }, 500)
            })
    } else {
        return response({ error: 'Filename required.' }, 400)
    }
}

module.exports = {
    main: main,
    getSignedUrl: getSignedUrl
}
