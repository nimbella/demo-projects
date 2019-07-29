import React, { Component } from 'react';
import { dollarSignWithDecimal } from "../action/numberFormat";
import PropTypes from 'prop-types';

import '../css/Header.css';
import logo from '../images/Nimbella-Logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpand: false
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props;
    const { isExpand } =  this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-inverse navbar-fixed-top">
        <div className="col-lg-12">
          <a className="navbar-brand" href="/">
            <img src={ logo } width="113" height="50" alt="Nimbella"/>
          </a>
          <h1 className="logo-text text f18 text-app text-semi">&#8212; Trade Application</h1>
          <ul className="navbar-collapse collapse navbar-nav mr-auto" style={ { display: (!isExpand)?'block':'none' } }>
            <li className="nav-item text f18 text-semi text-gray">
              Cash Balance:&nbsp;
              <span className="text text-white">
                { dollarSignWithDecimal(data.balance, 2) }
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
