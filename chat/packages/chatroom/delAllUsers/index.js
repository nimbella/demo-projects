const { redis } = require('nim');
const validation = require('./validation');
const crypto = require('crypto');

const authCheck = (username, password) => {
  const adminKey = 'chat_demo_admin/';
  return redis().getAsync(adminKey).then(data => {
    const admin = JSON.parse(data);
    const usernameOri = admin.username;

    let decipher = crypto.createDecipher("blowfish", validation.secretKey);
    decipher.update(admin.password, 'hex');
    let passwordOri = decipher.final('utf8');

    if(username.toString() === usernameOri && password.toString() === passwordOri) {
      return true;
    } else {
      return false;
    }
  });
};

const handleValidate = async (username, password) => {
  const usernameValidate = validation.username(username);
  const adminValidate = validation.admin(password);

  if(!usernameValidate.result) {
    return { returnCode: -1, message: usernameValidate.message }
  }

  if(!adminValidate.result) {
    return { returnCode: -1, message: adminValidate.message }
  }

  return { returnCode: 0 }
};

const main = (params) => {
  const username = params.username;
  const password = params.password;

  return handleValidate(username, password).then(res => {
    if (res.returnCode === 0) {
      return authCheck(username, password).then(valid => {
        if(valid) {
          const userListKey = 'chat_demo_user_list/';
          return redis().delAsync(userListKey).then(() => {
            return { returnCode: 0, message: 'All users are deleted' };
          });
        } else {
          return { returnCode: -1, message: 'username or password is not matched'};
        }
      });
    } else {
      return res;
    }
  });
};

exports.main = main;
