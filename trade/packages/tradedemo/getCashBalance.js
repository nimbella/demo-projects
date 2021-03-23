const nim = require('@nimbella/sdk')

function getCashBalance(rc, account_id) {
  const balanceKey = 'trade_demo_balance/' + account_id
  return rc.getAsync(balanceKey).then(function(balance) {
    if (balance != undefined) {
      balance = parseFloat(balance).toFixed(2)
    }
    return { balance }
  })
}

function main(params) {
  let account_id = params.account_id

  const rc = nim.redis()
  return getCashBalance(rc, account_id).then(function(balance) {
    return balance
  })
}
