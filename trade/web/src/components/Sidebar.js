import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decimalOnly, dollarPositiveSignWithDecimal } from "../action/numberFormat";
import ReactTooltip from 'react-tooltip';

import '../css/Sidebar.css';

class Sidebar extends Component {
  static propTypes = {
    fn: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired
  };

  render() {
    const { fn, active, data } = this.props;
    return (
        <div className="sidebar-wrap">
          <ul className="nav nav-sidebar">
            {
              data.map((item, index) => {
                return (
                  <Fragment key={ index }>
                    <li onClick={ () => fn(item.ticker) } className={ (active === item.ticker)?'active':null }>
                      <div className="col-xs-4 col-sm-12 col-lg-4 text line-height-closer truncate">
                        <span className="symbol text f18 text-gray">{ item.ticker }</span><br/>
                        <span className="text f12 text-gray" data-tip data-for={ item.ticker }>{ item.companyName }</span>
                      </div>
                      <div className="show-md">&nbsp;</div>
                      <div className="col-xs-2 col-sm-3 col-lg-2 text-center text line-height-closer">
                        <span className="text f18 text-white">{ item.numShares }</span><br/>
                        <span className="text f12 text-gray">Shares</span>
                      </div>

                      <div className="col-xs-3 col-sm-4 col-lg-3 text-center text line-height-closer">
                        <span className="text f18 text-white">
                          { decimalOnly(item.price, 2)}
                        </span><br/>
                        <span className="text f12 text-gray">Price</span>
                      </div>

                      <div className="col-xs-3 col-sm-5 col-lg-3">
                        <span className={`text-box ${(item.dayChange>=0)?'positive':'negative'}`}>
                          { dollarPositiveSignWithDecimal(item.dayChange, 2)}
                        </span>
                      </div>
                      <ReactTooltip id={ item.ticker } place="bottom" type="info" effect="float" className="ttip" delayShow={ 300 }>{ item.companyName }</ReactTooltip>
                    </li>
                  </Fragment>
                )
              })
            }
          </ul>
        </div>
    );
  }
}

export default Sidebar;