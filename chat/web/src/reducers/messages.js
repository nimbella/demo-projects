import { POST_MESSAGE, GET_MESSAGES, GET_LOOPMESSAGES, DEL_MESSAGE } from "../constants";

const messages = (state = [], action = {}) => {
  switch(action.type) {
    case POST_MESSAGE:
      return [
        ...state,
        action.messageData
      ];
    case DEL_MESSAGE:
      return state.filter((curr, i , arr) => {
        return curr.timestamp !== action.timestamp;
      });
    case GET_MESSAGES:
      return action.messages;
    default: return state;
    case GET_LOOPMESSAGES:
      return action.messages;
  }
};

export default messages;