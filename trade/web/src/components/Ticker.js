import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dollarSignWithDecimal, percentWithDecimal } from "../action/numberFormat";

class Ticker extends Component {
  static propTypes = {
    ticker: PropTypes.string.isRequired,
    gain: PropTypes.number.isRequired,
    gainP: PropTypes.number.isRequired
  };
  render() {
    const { ticker, gain, gainP } = this.props;
    return (
      <div className="symbol-wrap row">
        <div className="divider-10">&nbsp;</div>
        <div className="col-sm-3">
          <h2 className="text f24 text-white title">{ ticker }</h2>
        </div>
        <div className="col-sm-9">
          <h2 className="symbol text-right text  f24 text-gray title">
            Gain&nbsp;<span className={ `text ${ (gain >= 0)? 'text-positive': 'text-negative' }`}>
            { dollarSignWithDecimal(gain, 2) }&nbsp;
           ({ percentWithDecimal(gainP, 2) })</span></h2>
        </div>
        <div className="divider">&nbsp;</div>
        <div className="clearFix">&nbsp;</div>
      </div>
    );
  }
}

export default Ticker;