const axios = require('axios')
const google_api_token = process.env.GOOGLE_CIVIC_API_TOKEN

async function main(args) {
    const { address = '', electionId = 0, officialOnly = true, returnAllAvailableData = true } = args
    let path = `/civicinfo/v2/voterinfo?address=${encodeURI(address)}&electionId=${electionId}&officialOnly=${officialOnly}&returnAllAvailableData=${returnAllAvailableData}&key=${google_api_token}`

    return axios
        .get(`https://www.googleapis.com/${path}`)
        .then(res => ({ body: res.data }))
        .catch(error => ({ body: error.message }))
}

exports.main = main
