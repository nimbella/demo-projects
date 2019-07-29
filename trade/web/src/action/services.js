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

// TODO switch to simpler URL form for the nimbella bucket use case
function getVariableUrl() {
    let ans = process.env.REACT_APP_NIMBELLA_PROJECT_ROOT
    if (ans) {
        return ans
    }
    return '/api'
}

const handleAPI = (uri, method, data, cb) => {
  const VARIABLE_URL = `${getVariableUrl()}/tradedemo/`;
  console.log("computed URL for API:", VARIABLE_URL)
  const action = uri.split('?')[0];
  if(method === 'GET') {
    return axios.get(VARIABLE_URL + uri)
        .then(res => {
          colorLog(method, action, res.data);
          return res.data;
        })
        .catch(err => colorLog(method, action, err, true, () => {
          alert('System error.\nPlease try again later\n\n' + err);
        }));
  }
  else if(method === 'POST') {
    return axios.post(VARIABLE_URL + uri, data)
        .then(res => {
          colorLog(method, action, res.data);
          return res.data;
        })
        .catch(err => colorLog(method, action, err, true, () => {
          alert('System error.\nPlease try again later\n\n' + err);
        }));
  }
};
