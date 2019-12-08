const composer = require('openwhisk-composer')

module.exports =
  composer.sequence(
    // save parameters to use later
    composer.retain(
      ({ id, lang }) => ({
        text: `Starting OCR id ${id} (${lang})`
      }),
      // send slack notification
      'utils/slack'
    ),
    // restore saved parameters
    saved => saved.params,
    // invoke image-to-text on saved params
    'ocr/imageToText',
    ({ body: { id, activation } }) => ({
      text: `Finished OCR id ${id} (${activation})`
    }),
    // send result to slack
    'utils/slack'
  )
