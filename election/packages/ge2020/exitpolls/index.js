const fs = require('fs');

const contents = fs.readFileSync(__dirname + '/exitpolls.json', 'UTF-8');
const body = JSON.parse(contents);
function main(args) {
    return { body };
}

module.exports = { main }
