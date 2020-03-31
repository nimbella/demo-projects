import axios from 'axios';

export const fetchUUID = () => {
  return handleAPI('newAccount.json', 'GET')
};

export const fetchUserData = (uuid) => {
  return handleAPI('getCashBalance.json', 'POST', { account_id: uuid })
};

export const fetchStockList = (uuid) => {
  return handleAPI('getPositions.json', 'POST', { account_id: uuid })
};

export const getData = (s) => {
  return handleAPI('getStockDescription.json', 'POST', { ticker: s })
};

export const getStockHistory = (s) => {
  return handleAPI('getStockHistory.json', 'POST', { ticker: s })
};

export const buyStock = (data) => {
  console.log("Buying stock.  Data is", data)
  return handleAPI('buyStock.json', 'POST', data);
};

export const sellStock = (data) => {
  return handleAPI('sellStock.json', 'POST', data);
};

const colorLog = (m, a, r, err = false, cb = () => {}) => {
  console.log('%cmethod: %c' + m + '\n%caction: %c' + a + '\n%c' + ((err)?'error':'return') + ': ', 'color: #55bfd1', 'color: black', 'color: #55bfd1', 'color: black', 'color: #55bfd1', r);
  cb();
};

const handleAPI = (uri, method, data, cb) => {
  const apibase = '/api/tradedemo/';
  const action = uri.split('?')[0];
  if(method === 'GET') {
    return axios.get(apibase + uri)
        .then(res => {
          colorLog(method, action, res.data);
          return res.data;
        })
        .catch(err => colorLog(method, action, err, true, () => {
          alert('System error.\nPlease try again later\n\n' + err);
        }));
  }
  else if(method === 'POST') {
    return axios.post(apibase + uri, data)
        .then(res => {
          colorLog(method, action, res.data);
          return res.data;
        })
        .catch(err => colorLog(method, action, err, true, () => {
          alert('System error.\nPlease try again later\n\n' + err);
        }));
  }
};
