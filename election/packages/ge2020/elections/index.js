path = `/civicinfo/v2/elections&key=${google_api_token}`;
const axios = require("axios");

async function main(args) {
    const { google_api_token } = args
    const path = `/civicinfo/v2/elections&key=${google_api_token}`;

    return axios.get(`https://www.googleapis.com/${path}`)
        .then(res => {
            return { body: res.data }
        })
        .catch(error => { return { body: error }; })
}

exports.main = main;
