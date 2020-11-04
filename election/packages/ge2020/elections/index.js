const axios = require('axios')
const google_api_token = process.env.GOOGLE_CIVIC_API_TOKEN

const path = `https://www.googleapis.com/civicinfo/v2/elections?key=${google_api_token}`

async function main(args) {
    return axios
        .get(path)
        .then(res => ({ body: res.data }))
        .catch(error => ({ body: error.message }))
}

module.exports = { main }
