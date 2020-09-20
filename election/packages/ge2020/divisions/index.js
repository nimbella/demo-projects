const axios = require('axios')
const google_api_token = process.env.GOOGLE_CIVIC_API_TOKEN

async function main(args) {
    const { query = '' } = args
    const path = `/civicinfo/v2/divisions?query=${encodeURI(query)}&key=${google_api_token}`

    if (ocdId) {
        path = `/civicinfo/v2/representatives/${encodeURI(ocdId)}?recursive=${recursive}${levels ? `&levels=${levels}` : ''}${roles ? `&roles=${roles}` : ''}&key=${google_api_token}`
    }

    return axios
        .get(`https://www.googleapis.com/${path}`)
        .then(res => ({ body: res.data }))
        .catch(error => ({ body: error }))
}

exports.main = main
