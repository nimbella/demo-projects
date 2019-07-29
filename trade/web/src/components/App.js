import React, { Component, Fragment } from 'react';

import Charts from './Charts';
import Sidebar from './Sidebar';
import Header from "./Header";
import Ticker from './Ticker';
import About from './About';
import Summary from './Summary';
import Submit from './submit/Submit';
import ErrorBoundary from './ErrorBoundary';

import '../style.css';

import { getData, fetchStockList, fetchUserData, getStockHistory, fetchUUID } from '../action/services';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTicker: '',
      stockList: [],
      tickerList: [],
      chart: [],
      summary: {},
      userData: {},
      ticker: '',
      desc: ''
    }
  };

  componentDidMount() {
    let uuid = localStorage.getItem('uuid');
    if(!uuid) {
      this.handleGetAccount();
    } else {
      this.handleDataUpdate();
    }
  };

  init = (res = { chart: [] }, cTicker) => {
    // res.chart.map(i => {return i.date = new Date(i.date)});
    let { chart, gain, gainP, ticker, prevClose, open, close, peR, divY, mktCap, volume, aveVolume, wkH, wkL, desc } = res;
    this.setState({
      currentTicker: cTicker,
      chart,
      ticker,
      desc,
      summary: { gain, gainP, prevClose, open, close, peR, divY, mktCap, volume, aveVolume, wkH, wkL }
    })
  };

  handleSidebarClick = (t) => {
    let index = this.state.stockList.findIndex(item => item.ticker === t);
    let ticker = this.state.stockList[index].ticker;
    getData(ticker).then(res => {
      getStockHistory(ticker).then((arr = {}) => {
        res.chart = (typeof arr.prices === 'object')?this._handleHistoryData(arr.prices):[];
        this.init(res, ticker);
      });
    })
  };

  handleGetAccount = () => {
    fetchUUID().then(res => {
      localStorage.setItem('uuid', res.account_id);
      this.handleDataUpdate();
    });
  };

  handleDataUpdate = () => {
    let uuid = localStorage.getItem('uuid');
    fetchUserData(uuid).then(r => {
      if(r && r.balance !== null) {
//        if(r.balance === null) {
//          this.handleGetAccount();
//        }

        this.setState({
          userData: {
            balance: r.balance
          }
        })
      }
    });

    fetchStockList(uuid).then((res = {}) => {
      let positions = (res && res.positions)?res.positions:[];
      let tickerList = [];
      try {
        positions.forEach(i => {
          if (i.numShares > 0) {
            tickerList.push({value: i.ticker, label: i.ticker, shares: i.numShares});
          }
        });
      }
      catch(e) {console.log(e)};
      this.setState({ stockList: positions, tickerList });
      return positions;
    }).then(p => {
        if(p && p.length !== 0) {
          let ticker = p[0].ticker;
          getData(ticker).then((res = {}) => {
            getStockHistory(ticker).then((arr = {}) => {
              res.chart = (typeof arr.prices === 'object')?this._handleHistoryData(arr.prices):[];
              this.init(res, ticker);
            });
          });
        }
      }
    );
  };

  _handleHistoryData = (data = []) => {
    delete Object.assign(data, {date: data['label'] })['label'];
    data.map(i => { return i.date = new Date(i.date) });
    return data;
  };

  render() {
    const { stockList, tickerList, currentTicker, ticker, desc, chart, summary, userData } = this.state;
    return (
      <Fragment>
        <ErrorBoundary>
          <Header data={ userData }/>
        </ErrorBoundary>
        <div className="container-fluid">
          <div className="row">

            {/*Sidebar*/}
            <aside className="col-sm-5 col-md-4 sidebar padding-top-0">
              <ErrorBoundary>
                { (stockList.length === 0)?
                    <h3 className="text f18 text-gray text-normal">No stock on your list ...</h3>:
                    <Sidebar data={ stockList } fn={ this.handleSidebarClick } active={ currentTicker }/> }
              </ErrorBoundary>
            </aside>

            {/*Submit*/}
            <ErrorBoundary>
              <Submit ifData={ (ticker)?true:false } handleDataUpdate={ this.handleDataUpdate } tickerList={ tickerList }/>
            </ErrorBoundary>

            <main className="col-sm-7 col-sm-offset-5 col-md-8 col-md-offset-4 main padding-top-0">

              { stockList.length === 0 && <h3 className="text f18 text-gray text-normal">No stock is selected...</h3> }
              { stockList.length > 0 && !ticker && <Fragment><div className="divider-20">&nbsp;</div><div className="spinner-border text-info" role="status"><span className="sr-only">Loading...</span></div></Fragment> }
              <ErrorBoundary>
                {/*Ticker*/}
                { (ticker && <Ticker
                    ticker={ ticker }
                    gain={ summary.gain }
                    gainP={ summary.gainP }
                /> ) }
                { ticker && <div className="divider-10">&nbsp;</div> }

                {/*Chart*/}
                { (chart && chart.length !== 0) && <Charts data={ chart } /> }

                { desc && <div className="divider-20">&nbsp;</div> }

                {/*About*/}
                { desc && <About text={ desc }/> }

                { ticker && <div className="divider-20">&nbsp;</div> }

                {/*Summary*/}
                { ticker && <Summary summary={ summary }/> }

                { ticker && <div className="divider-20">&nbsp;</div> }

              </ErrorBoundary>
            </main>
          </div>
        </div>
      </Fragment>

    );
  }
}

export default App;
