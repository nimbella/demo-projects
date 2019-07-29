import { SET_USERNAME, GET_USERLIST, GET_LOOPUSERLIST, GET_MESSAGES, POST_MESSAGE, GET_LOOPMESSAGES, DEL_USERNAME, DEL_MESSAGE} from "../constants";
const uri = '/api/chatroom/'

export const getUserlist = (userlist, loop) => {
  return {
    type: loop ? GET_LOOPUSERLIST:GET_USERLIST,
    userlist
  }
};

export const fetchUserlist = (loop) => {
  return dispatch => {
    return fetch(uri + 'getUserList.json')
        .then(handleResponse)
        .then(data => {
          if(data) {
            dispatch(getUserlist(data.userlist.map(i => { return { username: i } }), loop));
            return data;
          }
        });
  }
};

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    username
  }
};

export const createUsername = (username) => {
  return dispatch => {
    return fetch(uri + 'newUserId.json', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
        .then(data => {
          if(data.returnCode === 0) {
            dispatch(setUsername({ username: data.username, active: true }));
          }
          return data;
        });
  }
};

export const delUsername = (username) => {
  return {
    type: DEL_USERNAME,
    username
  }
};

export const removeUsername = (username) => {
  return dispatch => {
    return fetch(uri + 'delByUserId.json', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
        .then(data => {
          dispatch(delUsername(data.username));
          return data;
        })
  }
};

export const postMessage = (messageData) => {
  return {
    type: POST_MESSAGE,
    messageData
  }
};

export const submitMessage = (data) => {
  const { username, message } = data;
  return dispatch => {
    return fetch(uri + 'postMessage.json', {
      method: 'POST',
      body: JSON.stringify({ username, message }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
        .then(res => {
          if(res.returnCode === 0) {
            dispatch(postMessage(res));
            return res;
          }
          if(res.returnCode === -1) {
            alert(res.message);
          }
        })
  }
};

export const delMessage = (timestamp) => {
  return {
    type: DEL_MESSAGE,
    timestamp
  }
};

export const removeMessage = (data) => {
  return dispatch => {
    return fetch(uri + 'delMessage.json', {
      method: 'POST',
      body: JSON.stringify({ item: data }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
        .then(res => {
          if(res.returnCode === 0) {
            dispatch(delMessage(res.timestamp))
          }
        });
  }
};

export const getMessages = (messages, loop) => {
  return {
    type: loop ? GET_LOOPMESSAGES:GET_MESSAGES,
    messages
  }
};

export const fetchMessages = (loop) => {
  return dispatch => {
    return fetch(uri + 'getMessages.json')
        .then(handleResponse)
        .then(data => {
          if(data) {
            dispatch(getMessages(data.messages, loop));
            return data;
          }
        })
  }
};

const handleResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
	  console.error(res)
    try{
      let error = new Error(res.statusText);
      error['response'] = res;
      throw error;
    }
    catch(err) {};
  }
};
