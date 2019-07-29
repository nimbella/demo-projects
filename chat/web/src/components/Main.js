import React, { Component, Fragment } from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';

class Main extends Component {
  render() {
    return (
        <Fragment>
          <main className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
            <Messages/>
          </main>
          <MessageInput/>
        </Fragment>
    );
  }
}

export default Main;