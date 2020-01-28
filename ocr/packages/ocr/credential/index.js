async function getSignedUrl(filename) {
    const nimbella = require('nim')
    const bucket   = await nimbella.storage()

    const file = bucket.file(filename)
    const expiration = 15 * 60 * 1000 // 15 minutes

    const putOptions = {
        version: 'v4',
        action: 'write',
        contentType: 'multipart/formdata; charset=UTF-8',
        expires: Date.now() + expiration
    }

    const getOptions = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + expiration
    }

    return Promise
    .all([ file.getSignedUrl(putOptions), file.getSignedUrl(getOptions) ])
    .then(([[signedPutUrl], [signedGetUrl]]) => {
        return {
            body: { signedPutUrl, signedGetUrl, bucketName: bucket.id }
        }
    })
    .catch(error => {
        console.log(error)
        return errorResponse(error.message)
    })
}

const main = (args) => {
    if (args.filename) {
        return getSignedUrl(args.filename)
    } else return errorResponse('filename required')
}

exports.main = main

function errorResponse(msg) {
    return {
        statusCode: 400,
        body: {
            error: msg
        }
    }
}

exports.main = main
