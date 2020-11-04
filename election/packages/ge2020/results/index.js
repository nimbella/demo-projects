const { allStates } = require('./all-states')
const { mainnetContract } = require('./election-contract')

async function main(_args) {
    const result = {}
    const fetchAllStates =
        allStates.map((state) => {
            return mainnetContract.methods
                .presidentialWinners(state)
                .call()
                .then((winner) => {
                    if (winner.winner === 'Trump')
                        result[state] = 'red'
                    else if (winner.winner === 'Biden')
                        result[state] = '#007bff'
                    else
                        result[state] = 'grey'
                });
        });
    return Promise.all(fetchAllStates).then(_res => ({ body: result })).catch(error => ({ body: error.message }));
}

module.exports = { main }
