const fetch = require('node-fetch');
const fs = require('fs');
let url = "https://apigcp.nimbella.io/api/v1/web/raichand-8kehpaun1bf/ge2020/timeseries";

let settings = { method: "Get" };
const TT = {}
years = ['1976',
    '1980',
    '1984',
    '1988',
    '1992',
    '1996',
    '2000',
    '2004',
    '2008',
    '2012',
    '2016']
const states = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT',
    'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID',
    'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
    'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC',
    'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD',
    'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI',
    'WV', 'WY'
]
fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        years.forEach(year => {
            states.forEach(state => {
                Object.entries(json[state].years[year].total).forEach(e => {
                    TT.years = Object.assign({}, TT.years)
                    TT.years[year] = Object.assign({}, TT.years[year])
                    TT.years[year][e[0]] = Object.assign(0, TT.years[year][e[0]])
                    TT.years[year][e[0]] =  Number(TT.years[year][e[0]]) + Number(e[1])
                });

            });
        });
        fs.writeFileSync(`total.json`, JSON.stringify(TT, null, 4))
    });
