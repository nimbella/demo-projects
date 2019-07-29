import { SET_USERNAME, GET_USERLIST, GET_LOOPUSERLIST, DEL_USERNAME } from "../constants";

const userlist = (state = [], action = {}) => {
  switch(action.type) {
    case SET_USERNAME:
      return [
        ...state,
        action.username
      ];
    case DEL_USERNAME:
      return state.filter((curr, i , arr) => {
        return curr.username !== action.username;
      });
    case GET_USERLIST:
      return action.userlist;
    default: return state;
    case GET_LOOPUSERLIST:
      return action.userlist;
  }
};

export default userlist;