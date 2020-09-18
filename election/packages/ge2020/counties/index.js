const fs = require('fs');

function main(args) {

    const year = args.year || '';
    const contents = fs.readFileSync(__dirname + `/counties${year}.json`, 'UTF-8');

    return { body: JSON.parse(contents) };

}

exports.main = main;
