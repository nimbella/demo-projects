const validation = {
  secretKey: 'This is a secret key',
  username: (s) => {
    if(!s) {
      return { result: false, message: 'Username is required' };
    }
    if(!/^[0-9a-zA-z_.-]+$/.test(s)) {
      return { result: false, message: 'Username contains numbers, English letters, dashes, dot only'};
    }
    return { result: true };
  },
  message: (s) => {
    if(!s) {
      return { result: false, message: 'Message is required' };
    }
    if(/[<>]/g.test(s)) {
      return { result: false, message: 'Message may contains harmful content'}
    }
    return { result: true }
  },
  admin: (p) => {
    if(!p) {
      return { result: false, message: 'Password is required' };
    }
    if(!/^[0-9a-zA-z_.-]+$/.test(p)) {
      return { result: false, message: 'Password contains numbers, English letters, dashes, dot only'};
    }
    return { result: true }
  }
};

module.exports = validation;
