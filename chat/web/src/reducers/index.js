import { combineReducers } from "redux";
import userlist from './userlist';
import messages from './messages'

export default combineReducers({
  userlist,
  messages
});