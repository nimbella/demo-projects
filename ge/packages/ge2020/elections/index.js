const https = require("https");

const options = {
    "method": "GET",
    "hostname": "www.googleapis.com",
    "port": null,
    "headers": {}
};
function main(args) {
    const { g_token } = args
    option.path = `/civicinfo/v2/elections&key=${g_token}`;
    const req = https.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            return { body: JSON.parse(body.toString()) };
        });

        res.on("error", function (error) {
            return { body: error };
        });
    });
    req.end();
}

exports.main = main;
