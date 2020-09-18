const fs = require('fs');

let contents;

function main(args) {
	if (!contents) {
		contents = fs.readFileSync(__dirname + '/exitpolls.json', 'UTF-8');
	}
	return { body: JSON.parse(contents) };
}

exports.main = main;
