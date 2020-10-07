const fs = require('fs');

const contents = fs.readFileSync(__dirname + '/state_county_wise.json', 'UTF-8');
const body = JSON.parse(contents);

function main(args) {

    return { body };
}

exports.main = main;