import React, { Component } from 'react';
import logo from '../images/Nimbella-Logo.svg';

import '../stylesheets/Header.css';

class Header extends Component {
  render() {
    return (
        <nav className="navbar navbar-inverse">
          <div className="col-lg-12">
            <a className="navbar-brand" href="/">
              <img src={ logo } width="113" height="50" alt="Nimbella"/>
            </a>
            <h1 className="logo-text text f18 text-app text-semi">&#8212; OCR Application</h1>
          </div>
        </nav>
    );
  }
}

export default Header;
