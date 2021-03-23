const nimbella = require('@nimbella/sdk'),
      redis = nimbella.redis()

const response = (body, statusCode) => ({ statusCode: statusCode || 200, body })

async function getSignedUrl(filename) {
    const bucket = await nimbella.storage()
    const file = bucket.file(filename)
    const expiration = 10 * 60 * 1000 // 10 minutes

    const getOptions = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + expiration
    }

    return file
        .getSignedUrl(getOptions)
        .then(_ => _[0])
}

function main(args) {
    if (args && args.id) {
        return redis
            .getAsync(args.id)
            .then(async (_) => {
                let form = JSON.parse(_)
                form.image = await getSignedUrl(form.id)
                return response(form)
            })
            .catch(error => {
                console.log(error)
                return response({ error: 'Invalid file id.' }, 404)
            })
    } else {
        return response({ error: 'File id required.' }, 400)
    }
}

module.exports = {
    main: main
}
