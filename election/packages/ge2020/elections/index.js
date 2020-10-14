const axios = require('axios')
const google_api_token = process.env.GOOGLE_CIVIC_API_TOKEN


async function main(args) {
    return axios
        .get(`https://www.googleapis.com/civicinfo/v2/elections?key=${google_api_token}`)
        .then(res => ({ body: res.data }))
        .catch(error => ({ body: error.message }))
}

module.exports = { main }
