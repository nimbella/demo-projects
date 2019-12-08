const worker = require('tesseract.js'),
      nimbella = require('nim'),
      redis = nimbella.redis()

const ocr = (url, lang, id, promise) => {
  worker
  .recognize(url, lang)
  .progress(res => {
    if (res) {
      let { status, progress } = res
      console.log(`${status}...${progress}`)
      progress = status == 'recognizing text' ? progress : 0
      redis
      .setAsync(id, JSON.stringify({ progress, status }))
      .catch(console.log)
    }
  })
  .then(result => {
    const lines = result.lines
    const textOverlay = lines.map(i => ({ bbox: i.bbox }))
    redis.setAsync(id, JSON.stringify({ text: JSON.parse(JSON.stringify(result.text)), textOverlay, progress: 1, status: 'done' })).then(() => {
      promise.resolve({ body: { id, lang, text: result.text, textOverlay, activation: process.env.__OW_ACTIVATION_ID } })
    })
  })
  .catch(error => {
    console.log(error)
    promise.reject(errorResponse(error.message))
  })
}

const main = (args) => {
  const { url, lang, id } = args
  return new Promise((resolve, reject) => {
      ocr(url, lang, id, { resolve, reject })
  })
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

