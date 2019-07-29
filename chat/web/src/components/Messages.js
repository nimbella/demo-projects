import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchMessages, removeMessage } from "../actions";
import Emojify from 'react-emojione';

import '../stylesheets/Messages.css';

class Messages extends Component {
  componentDidMount() {
    this.props.fetchMessages();
    this.handleScrollToBottom();
    this.tmr = setInterval(() => {
      this.props.fetchMessages(true);
    }, 2000);
  }

  componentWillUnmount() {
    this.tmr.clearInterval();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.messages.length !== prevProps.messages.length) {
      this.handleScrollToBottom();
    }
  }

  handleScrollToBottom = () => {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  };


  handleTimeFormat = (t) => {
    let time = new Date(t);
    let h = time.getHours();
    let ap = (h >= 12)? 'pm' : 'am';
    let m = time.getMinutes();
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0' + m : m;
    return h + ":" + m + ap;
  };

  handleDelete = (o) => {
    this.props.removeMessage(o);
  };

  render() {
    const { messages } = this.props;
    const username = localStorage.getItem('username');
    const headerHeight = 59;
    const messageInputHeight = 75;
    return (
        <ul className="messages-wrap" ref={ el => { this.scrollList = el }} style={{ height: (window.innerHeight - headerHeight - messageInputHeight) }}>
          { (messages.length)?messages.map((i, index) => {
            return (
                <li className={ `message ${ (i.username === username )?'me':null }` } key={ index }>
                  { (i.username !== username) && <div className="init hidden-xs"><span className="text box-text">{ i.username[0] }</span></div> }
                  <div className="info">
                    <span className="text f14 text-semi">{ (i.username === username)?'me' : i.username }</span>
                    { i.timestamp && <span className="text f14 text-light">{ this.handleTimeFormat(i.timestamp) }</span> }<br/>
                    <span className="message-box"><Emojify style={{ height: '15px', width: '15px' }}>{ i.message }</Emojify></span>

                    { (i.username === username || i.active) && <span className="glyphicon glyphicon-remove-circle pull-right text f20 text-gray del-btn" onClick={ () => this.handleDelete(i) }></span> }
                  </div>
                </li>
            )
          }):<li className="message">No message yet...</li> }
        </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchMessages, removeMessage })(Messages);
