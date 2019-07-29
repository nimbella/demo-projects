const { redis } = require('nim');

const main = () => {
  const adminKey = 'chat_demo_admin/';

  return redis().getAsync(adminKey).then(res => {
    if(res) {
      const admin = JSON.parse(res).username;
      return { returnCode: 0, admin };
    }
    return { returnCode: -1, message: "Admin is not set yet." }
  })
};

exports.main = main;
