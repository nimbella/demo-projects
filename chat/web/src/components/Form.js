import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/Form.css';
import { connect } from "react-redux";
import { createUsername } from "../actions";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }

  static propTypes = {
    fn: PropTypes.func.isRequired
  };

  setError = (field, value) => {
    let errors = {};
    errors[field] = value;
    this.setState({
      errors,
      invalid: true
    })
  };

  removeError = () => {
    this.setState({
      errors: {},
      invalid: false
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.removeError();
    const username = this.refs.username.value;
    const re = /[!@#$%^&*(),.?":{}|<>]/g;
    if(username) {
      if(re.test(username)) {
        this.setError('username', 'English letters and numbers only');
      } else {
        this.props.createUsername(username)
            .then(res => {
              if (res.returnCode === 0) {
                localStorage.setItem('username', username);
                this.props.fn()
              } else {
                this.setError('username', 'Username has been taken');
                this.refs.username.select();
              }
            })
            .catch(err => {
              console.log(err);
              if(err) {
                this.setError('username', err.message)
                // this.setError('username', 'Username has been taken');
                // this.refs.username.select();
              }

            });
      }
    } else {
      this.setError('username', 'This field can not be empty');
    }
  };

  render() {
    const { errors } = this.state;
    return (
        <div className="mask">
          <div className="form-wrap col-sm-6 col-sm-offset-3">
            <div className="clearfix">&nbsp;</div>
            <form onSubmit={ this.handleSubmit }>
              <div className="col-sm-10 col-sm-offset-1">
                <div className={ `form-group one-line ${ (errors.username)?'has-error':null }` }>
                  <label className="text f18 text-normal text-gray">Please create a new username</label>
                  <input type="text" className="form-control" ref="username"/>
                  <div className="clearfix">&nbsp;</div>
                  { errors && <span className='form-text text-danger'>{ errors.username }</span> }
                </div>
              </div>
              <div className="btn-wrap right">
                <button className="btn btn-app">Submit</button>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

Form.propTypes = {
  createUsername: PropTypes.func.isRequired,
  fn: PropTypes.func.isRequired
};

export default connect(null, { createUsername })(Form);