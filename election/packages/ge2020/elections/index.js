path = `/civicinfo/v2/elections&key=${g_token}`;
const axios = require("axios");

async function main(args) {
    const { g_token } = args
    const path = `/civicinfo/v2/elections&key=${g_token}`;

    return axios.get(`https://www.googleapis.com/${path}`)
        .then(res => {
            return { body: res.data }
        })
        .catch(error => { return { body: error }; })
}

exports.main = main;
