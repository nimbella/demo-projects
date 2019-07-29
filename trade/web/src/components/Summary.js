import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decimalOnly, shortNum } from "../action/numberFormat";

class Summary extends Component {
  static propTypes = {
    summary: PropTypes.object.isRequired
  };

  elemSubject = (s) => {
    return (<div className="col-xs-6 text f18 text-gray">{ s }</div>);
  };

  elemWithDecimal = (num) => {
    return (<div className="col-xs-6 text f18 text-white text-right">{ decimalOnly(num, 2) }</div>);
  };

  elemWithNumConvert = (num) => {
    return (<div className="col-xs-6 text f18 text-white text-right">{ shortNum(num, 3) }</div>);
  };

  render() {
    const { prevClose, open, close, peR, divY, mktCap, volume, aveVolume, wkH, wkL } = this.props.summary;

    return (
        <div className="row">
          <div className="col-lg-12 summary-wrap">
            <h2 className="text f24 text-white">Summary</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  { this.elemSubject('Prev Close') }
                  { this.elemWithDecimal(prevClose) }
                  { this.elemSubject('Open') }
                  { this.elemWithDecimal(open) }
                  { this.elemSubject('Close') }
                  { this.elemWithDecimal(close) }
                  { this.elemSubject('PE Ratio') }
                  { this.elemWithDecimal(peR) }
                  { this.elemSubject('Div/Yield') }
                  { this.elemWithDecimal(divY) }
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  { this.elemSubject('Market Cap') }
                  { this.elemWithNumConvert(mktCap) }
                  { this.elemSubject('Volume') }
                  { this.elemWithNumConvert(volume) }
                  { this.elemSubject('Ave Volume') }
                  { this.elemWithNumConvert(aveVolume) }
                  { this.elemSubject('52wk High') }
                  { this.elemWithDecimal(wkH) }
                  { this.elemSubject('52wk Low') }
                  { this.elemWithDecimal(wkL) }
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Summary;