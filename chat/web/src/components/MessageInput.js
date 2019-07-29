import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { submitMessage } from "../actions";

import '../stylesheets/MessageInput.css';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  };

  handleLoading = () => {
    this.setState({ isLoading: true });
  };

  handleUnloading = () => {
    this.setState({ isLoading: false });
  };

  handleEnter = (e) => {
    let message = this.refs.message.value;
    let username = localStorage.getItem('username');
    if(e.key === 'Enter' && message) {
      this.handleLoading();
      this.props.submitMessage({ message, username })
          .then(res => {
            if(res.returnCode === 0) {
              this.handleUnloading();
              this.refs.message.focus();
              this.refs.message.value = '';
            }
          })
          .catch(err => console.log(err));
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
        <div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 input-wrap">
          <div className="form-group one-line">
            <input type="text" className="form-control" ref="message" onKeyPress={ this.handleEnter } placeholder="message..." disabled={ isLoading }/>
          </div>
        </div>
    );
  }
}

Message.propTypes = {
  submitMessage: PropTypes.func.isRequired

};

export default connect(null, { submitMessage })(Message);