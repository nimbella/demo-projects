const axios = require("axios");

async function main(args) {

    const { google_api_token, address = '', electionId = 0, officialOnly = true, returnAllAvailableData = true } = args
    let path = `/civicinfo/v2/voterinfo?address=${encodeURI(address)}&electionId=${electionId}&officialOnly=${officialOnly}&returnAllAvailableData=${returnAllAvailableData}&key=${google_api_token}`

    return axios.get(`https://www.googleapis.com/${path}`)
        .then(res => {
            return { body: res.data }
        })
        .catch(error => { return { body: error }; })
}

exports.main = main;
