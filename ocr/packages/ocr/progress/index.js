const nimbella = require('nim'),
      redis = nimbella.redis()

const main = args => {
  const { id } = args
  if (id) {
    return redis
      .getAsync(id)
      .then(res => {
        if (res) {
          const { progress = 0, status = '', text = '', textOverlay = [] } = JSON.parse(res)
          return {
            body: {
              progress,
              status,
              text,
              textOverlay
            }
          }
        } else {
          return {
            body: {
              progress: 0,
              status: 'waiting...'
            }
          }
        }
      })
      .catch(error => {
        console.log(error)
        return errorResponse(error.message)
      })
  } else return errorResponse('The param id is required.')
}

const errorResponse = (msg, code) => {
  return {
    statusCode: code || 400,
    body: {
      error: msg
    }
  }
}

exports.main = main
