import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buy from './Buy';
import Sell from './Sell';

class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buy: false,
      sell: false
    }
  }

  handleShowBuyForm = (e) => {
    e.preventDefault();
    this.setState({ buy: true })
  };

  handleShowSellForm = (e) => {
    e.preventDefault();
    this.setState({ sell: true })
  };

  handleClose = () => {
    this.setState({ buy: false, sell: false })
  };

  static propTypes = {
    handleDataUpdate: PropTypes.func.isRequired,
    ifData: PropTypes.bool.isRequired,
    tickerList: PropTypes.array.isRequired
  };

  render() {
    const { buy, sell } = this.state;
    const { handleDataUpdate, ifData, tickerList } = this.props;
    return (
      <div className="col-xs-12 col-sm-5 col-md-4 submit-wrap">
        <div className="row">
          <Buy showForm={ buy } handleClose={ this.handleClose } handleDataUpdate={ handleDataUpdate }/>
          <Sell showForm={ sell } handleClose={ this.handleClose } handleDataUpdate={ handleDataUpdate } tickerList={ tickerList }/>

          <div className="divider">&nbsp;</div>

          <div className="btn-wrap right bg">
            <button type="button" className="btn btn-app" onClick={ this.handleShowBuyForm }>Buy</button>
            { ifData && <button type="button" className="btn btn-app btn-last-r" onClick={ this.handleShowSellForm } disabled={ tickerList.length <= 0 }>Sell</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;