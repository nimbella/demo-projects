const axios = require("axios");

async function main(args) {
    const { g_token, ocdId = '', address = '', levels = '', roles = '', includeOffices = true, recursive = true } = args
    let path = `/civicinfo/v2/representatives?address=${encodeURI(address)}&includeOffices=${includeOffices}${levels ? `&levels=${levels}` : ''}${roles ? `&roles=${roles}` : ''}&key=${g_token}`
    if (ocdId)
        path = `/civicinfo/v2/representatives/${encodeURI(ocdId)}?recursive=${recursive}${levels ? `&levels=${levels}` : ''}${roles ? `&roles=${roles}` : ''}&key=${g_token}`

    return axios.get(`https://www.googleapis.com/${path}`)
        .then(res => {
            return { body: res.data }
        })
        .catch(error => { return { body: error }; })
}

exports.main = main;
