const { redis } = require('nim');

const main = (params) => {
  const messagePoolKey = 'chat_demo_message_pool';

  return redis().llenAsync(messagePoolKey).then(total => {
    let limit = 10;
    let page = (params.page) ? parseInt(params.page) : 1;
    let maxPage = Math.round(total/limit);
    let from = (maxPage > page) ? (total - limit * page) : 0;
    let to = (page === 1) ? total : (total - ((page - 1) * limit) - 1);

    if(!params.page) { // get all message list if params is not available
      from = 0;
      to = -1;
      maxPage = 1;
      page = 1;
    }

    if(page <= maxPage && page > 0) {
      return redis().lrangeAsync(messagePoolKey, from, to).then(res => {
        const messages = res.map(i => {
          return JSON.parse(i);
        });
        return { messages, returnCode: 0, total };
      })
    } else {
      return { returnCode: -1, message: 'page over the range limit', maxPage, page }
    }

  });

};

exports.main = main;
