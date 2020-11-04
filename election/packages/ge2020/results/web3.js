const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.INFURA_MAINNET_HTTP || 'https://mainnet.infura.io/v3/d390dc5f79ce4cf38314163a516084a1')
);
module.exports = { web3 }
