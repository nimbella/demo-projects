const { redis } = require('nim');
const validation = require('./validation');

const main = (params) => {
  const key = params.key;
  const pair = validation.secretKey;
  const adminKey = 'chat_demo_admin/';

  if(!key) {
    return { returnCode: -1, message: 'Please provide secret key' };
  }

  if(key === pair) {
    return redis().delAsync(adminKey).then(() => {
      return { returnCode: 0, message: 'Admin account has been reset' };
    });
  } else {
    return { returnCode: -1, message: 'The key is not matched' };
  }
};

exports.main = main;
