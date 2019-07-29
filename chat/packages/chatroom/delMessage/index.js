const { redis } = require('nim');

const main = (params) => {
  const messagePoolKey = 'chat_demo_message_pool';
  return redis().lrangeAsync(messagePoolKey, 0, -1).then((list) => {
    return redis().lremAsync('chat_demo_message_pool', 1, JSON.stringify(params.item)).then(res => {
      if(res === 0) {
        return { returnCode: -1, message: "Message data is mismatched" }
      }
      return { returnCode: 0, timestamp: params.item.timestamp }
    });
  });
};

exports.main = main;
