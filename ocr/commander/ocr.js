// jshint esversion: 9
// jshint asi:true

const openwhisk = require('openwhisk')

/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText slack text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Slack response body
 */
async function _command(params, commandText, secrets = {}) {
  const wsk = openwhisk({api_key: secrets.api_key, namespace: secrets.namespace})
  return wsk
    .activations
    .result({name: params.id})
    .then(activation => {
      console.log(activation)
      return {
        response_type: 'in_channel',
        text: activation.result.body.text
      }
    })
}

/**
 * @typedef {object} SlackBodyType
 * @property {string} text
 * @property {'in_channel'|'ephemeral'} [response_type]
 */

const main = async ({__secrets = {}, commandText, ...params}) => ({body: await _command(params, commandText, __secrets)})
module.exports = main
