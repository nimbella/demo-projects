const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const data = {}
let years = {}
let total = {}
let meta = {}
let candidates = {}

let changers = { counter: 0 }

fs.createReadStream(path.resolve(__dirname, '..', 'raw-data', '1976-2020-president.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        if (changers.counter == 0) {
            changers.state = row.state_po
            changers.year = row.year
        }
        changers.counter = changers.counter + 1

        if (changers.year != row.year) {
            years[changers.year] = { total, meta, candidates }
            total = {}
            meta = {}
            candidates = {}
            changers.year = row.year
        }

        if (changers.state != row.state_po) {
            years[changers.year] = { total, meta, candidates }
            data[changers.state] = Object.assign({}, data[changers.state])
            data[changers.state].years = Object.assign(years, data[changers.state].years)
            years = {}
            total = {}
            meta = {}
            candidates = {}
            changers.state = row.state_po
        }
        total[row.party_simplified || 'others'] = row.candidatevotes
        meta['total'] = row.totalvotes
        candidates[row.party_simplified || 'others'] = row.candidate

    }

    )
    .on('end', rowCount => {
        console.log(JSON.stringify(data, null, 4))
        fs.writeFileSync('timeseries.json', JSON.stringify(data, null, 4))
        console.log(`Parsed ${rowCount} rows`)
    });
