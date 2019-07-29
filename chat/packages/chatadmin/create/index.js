const { redis } = require('nim');
const validation = require('./validation');
const crypto = require('crypto');

const handleAddUser = async (username, password, old) => {
  const adminKey = 'chat_demo_admin/';
  const jsonfyData = JSON.stringify({ username, password });

  return redis().getAsync(adminKey).then(data => {
    if(data) {
      if(!old) {
        return { returnCode: -1, message: 'Admin account is existed. Please add old password parameter to update admin account.' };
      }
      const admin = JSON.parse(data);
      let decipher = crypto.createDecipher("blowfish", validation.secretKey);
      decipher.update(admin.password, 'hex');
      let password = decipher.final('utf8');

      if(old.toString() !== password) {
        return { returnCode: -1, message: 'The old password is incorrect' }
      }
    }

    return redis().setAsync(adminKey, jsonfyData).then(() => {
      return { returnCode: 0, username };
    });
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
  let password = params.password;
  const old = params.old;

  return handleValidate(username, password).then(res => {
    if(res.returnCode === 0) {
      let cipher = crypto.createCipher("blowfish", validation.secretKey);
      cipher.update(password.toString());
      password = cipher.final('hex');

      return handleAddUser(username, password, old).then(status => {
        return status;
      });
    } else {
      return res;
    }
  });
};


exports.main = main;
