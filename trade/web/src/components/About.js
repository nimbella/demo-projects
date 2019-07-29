import React, { Component } from 'react';
import PropTypes from 'prop-types';

class About extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };
  render() {
    return (
        <div className="row">
          <div className="col-lg-12">
            <h2 className="text f24 text-semi text-white">About</h2>
            <p className="text f18 text-normal text-gray">{ this.props.text }</p>
          </div>
        </div>
    );
  }
}

export default About;