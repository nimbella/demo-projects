const https = require("https");

const options = {
    "method": "GET",
    "hostname": "www.googleapis.com",
    "port": null,
    "headers": {}
};
function main(args) {

    const { g_token, ocdId = '', address = '', levels = [], roles = [], includeOffices = true, recursive = true } = args

    if (ocdId)
        options.path = `/civicinfo/v2/representatives/${encodeURI(ocdId)}?recursive=${recursive}${levels.length ? `&levels=${levels}` : ''}${roles.length ? `&roles=${roles}` : ''}&key=${g_token}`
    else
        options.path = `/civicinfo/v2/representatives?address=${encodeURI(address)}&includeOffices=${includeOffices}${levels.length ? `&levels=${levels}` : ''}${roles.length ? `&roles=${roles}` : ''}&key=${g_token}`

    console.log(g_token);
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