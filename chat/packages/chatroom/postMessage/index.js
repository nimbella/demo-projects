const { redis } = require('nim');
const validation = require('./validation');

const handleAddMessage = (username, message, timestamp) => {
  const messagePoolKey = 'chat_demo_message_pool';
  const userListKey = 'chat_demo_user_list/';

  return redis().sismemberAsync(userListKey, username).then(userExists => {
    if(userExists) {
      return redis().rpushAsync(messagePoolKey, JSON.stringify({ message, timestamp, username })).then(() => {
        return { "returnCode": 0, username, message, timestamp };
      })
    } else {
      return { "returnCode": -1, message: 'Username is not existed' };
    }
  })
};

const handleValidate = async (username, message) => {
  const usernameValidate = validation.username(username);
  const messageValidate = validation.message(message);

  if(!usernameValidate.result) {
    return { returnCode: -1, message: usernameValidate.message }
  }

  if(!messageValidate.result) {
    return { returnCode: -1, message: messageValidate.message }
  }
  return { returnCode: 0 }
};

const main = (params) => {
  const username = params.username;
  const message = params.message;
  const timestamp = new Date();

  return handleValidate(username, message).then(res => {
    if(res.returnCode === 0) {
      return handleAddMessage(username, message, timestamp).then(result => {
        return result;
      });
    } else {
      return res;
    }
  });
};

exports.main = main;
