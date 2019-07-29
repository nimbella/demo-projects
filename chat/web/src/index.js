import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { GET_LOOPUSERLIST, GET_LOOPMESSAGES } from "./constants";

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/dashboard.css';
import './stylesheets/style.css';

const logger = createLogger({
    predicate: (getState, action) => action.type !== GET_LOOPMESSAGES && action.type !== GET_LOOPUSERLIST
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
