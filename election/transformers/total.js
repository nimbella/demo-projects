const fetch = require('node-fetch');
const fs = require('fs');
let url = "https://devchand-hfo8lwtg1e5-apigcp.nimbella.io/api/ge2020/timeseries";

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
    '2016',
    '2020'
]
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
            const counter  = {democrat:0,libertarian:0,other:0,republican:0}
            states.forEach(state => {
                Object.entries(json[state].years[year].total).forEach(e => {
                    counter[e[0]] = counter[e[0]] + Number(e[1])
                    TT.years = Object.assign({}, TT.years)
                    TT.years[year] = Object.assign({}, TT.years[year])
                    TT.years[year][e[0]] =  counter[e[0]]  //Object.assign(0, TT.years[year][e[1]])
                    // TT.years[year][e[0]] = Number(TT.years[year][e[0]]) + Number(e[1])
                    
                    TT.years[year].total = Object.assign({}, TT.years[year].total)
                    TT.years[year].total[e[0]] = counter[e[0]] //Object.assign(0, TT.years[year].total[e[0]])
                });

            });
        });
        fs.writeFileSync(`total.json`, JSON.stringify(TT, null, 4))
    });
