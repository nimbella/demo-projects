const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const data = {}
let counties = {}
let total = {}
let meta = {}
let candidates = {}

const changers = { counter: 0 }

const rawdata = fs.readFileSync('timeseries.min.json');
const ts = JSON.parse(rawdata);
const year = 2000

fs.createReadStream(path.resolve(__dirname, 'data', `countypres_${year}.csv`))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        if (changers.counter == 0) {
            changers.state = row.state_po
            changers.county = row.county
        }
        changers.counter = changers.counter + 1

        if (changers.county != row.county) {
            counties[changers.county] = { total, meta, candidates }
            total = {}
            meta = {}
            candidates = {}
            changers.county = row.county
        }

        if (changers.state != row.state_po) {
            counties[changers.county] = { total, meta, candidates }
            data[changers.state] = Object.assign({}, data[changers.state])
            data[changers.state].counties = Object.assign(counties, data[changers.state].counties)
            data[changers.state].total = (((ts[changers.state]||'').years||'')[year]||'').total
            counties = {}
            total = {}
            meta = {}
            candidates = {}
            changers.state = row.state_po
        }
        total[row.party || 'others'] = row.candidatevotes
        meta['total'] = row.totalvotes
        candidates[row.party || 'others'] = row.candidate

    }

    )
    .on('end', rowCount => {
        console.log(JSON.stringify(data, null, 4))
        fs.writeFileSync(`data-${year}.min.json`, JSON.stringify(data, null, 4))
        console.log(`Parsed ${rowCount} rows`)
    });
