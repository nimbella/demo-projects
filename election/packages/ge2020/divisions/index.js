const axios = require("axios");

async function main(args) {
    const { google_api_token, query = '' } = args
    const path = `/civicinfo/v2/divisions?query=${encodeURI(query)}&key=${google_api_token}`
    if (ocdId)
        path = `/civicinfo/v2/representatives/${encodeURI(ocdId)}?recursive=${recursive}${levels ? `&levels=${levels}` : ''}${roles ? `&roles=${roles}` : ''}&key=${google_api_token}`

    return axios.get(`https://www.googleapis.com/${path}`)
        .then(res => {
            return { body: res.data }
        })
        .catch(error => { return { body: error }; })
}

exports.main = main;
