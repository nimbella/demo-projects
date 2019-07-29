import React, { Component } from 'react';
import logo from '../images/Nimbella-Logo.svg';
import '../stylesheets/Header.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class Header extends Component {
  handleSidebar = (e) => { 
    e.preventDefault();
    this.props.fn();
  };

  render() {
    const { show, userlist } = this.props;
    const userNum = userlist.length;
    return (
        <nav className="navbar navbar-expand-lg navbar-inverse navbar-fixed-top">
          <div className="col-lg-12">
            <a className="navbar-brand" href="/">
              <img src={ logo } width="113" height="50" alt="Nimbella"/>
            </a>
            <h1 className="logo-text text f18 text-app text-semi">&#8212; Chat Application</h1>
            <span className={ `text f18 text-normal list-icon show-xs ${ (show)? 'active':'' }` } onClick={ this.handleSidebar }>({ userNum })</span>
          </div>
        </nav>
    );
  }
}

Header.propTypes = {
  fn: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return{
    userlist: state.userlist,
  }
};

export default connect(mapStateToProps, {})(Header);
