const axios = require("axios");

async function main(args) {
    const { g_token, query = '' } = args
    const path = `/civicinfo/v2/divisions?query=${encodeURI(query)}&key=${g_token}`
    if (ocdId)
        path = `/civicinfo/v2/representatives/${encodeURI(ocdId)}?recursive=${recursive}${levels ? `&levels=${levels}` : ''}${roles ? `&roles=${roles}` : ''}&key=${g_token}`

    return axios.get(`https://www.googleapis.com/${path}`)
        .then(res => {
            return { body: res.data }
        })
        .catch(error => { return { body: error }; })
}

exports.main = main;
