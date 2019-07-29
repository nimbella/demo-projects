const { redis } = require('nim');

const main = () => {
  const userListKey = 'chat_demo_user_list/';

  return redis().smembersAsync(userListKey).then(userlist => {
    return { returnCode: 0, userlist };
  })
};

exports.main = main;
