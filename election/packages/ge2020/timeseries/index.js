const fs = require('fs');

const contents = fs.readFileSync(__dirname + '/timeseries.json', 'UTF-8');
const body = JSON.parse(contents);

function main(args) {

    return { body };
}

exports.main = main;