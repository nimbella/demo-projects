const { redis } = require('nim');
const validation = require('./validation');

const handleDel = (username) => {
  const userListKey = 'chat_demo_user_list/';
  return redis().sismemberAsync(userListKey, username).then(userExists => {
    if(userExists) {
      return redis().sremAsync(userListKey, username).then(() => {
        return { "returnCode": 0, "username": username };
      })
    }
    return { "returnCode": -1, "message": "username is not existed" };
  })
};

const handleValidate = async (username) => {
  const usernameValidate = validation.username(username);

  if(!usernameValidate.result) {
    return { returnCode: -1, message: usernameValidate.message }
  }

  return { returnCode: 0 }
};

const main = (params) => {
  const username = params.username;

  return handleValidate(username).then(res => {
    if(res.returnCode === 0) {
      return handleDel(username).then(result => {
        return result
      });
    } else {
      return res;
    }
  });
};

exports.main = main;
