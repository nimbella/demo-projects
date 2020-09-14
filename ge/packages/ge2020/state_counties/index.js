const fs = require('fs');

let contents;

function main(args) {

	if (!contents) {
		contents = fs.readFileSync(__dirname + '/state_county_wise.json', 'UTF-8');
	}

	return {body:JSON.parse(contents)};

}

exports.main = main;
