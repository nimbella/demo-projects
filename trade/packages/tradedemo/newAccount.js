const nim = require('@nimbella/sdk')

function newAccountBalance(rc, account_id, newBalance) {
  const balanceKey = 'trade_demo_balance/' + account_id
  return rc.setAsync(balanceKey, 10000).then(function() {
    return { account_id }
  })
}

function main(params) {
  const crypto = require("crypto")
  const account_id = crypto.randomBytes(16).toString("hex")

  const rc = nim.redis()
  return newAccountBalance(rc, account_id, 10000).then(function(res) {
    return res
  })
}
