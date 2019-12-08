import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Result.css';

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlay: false
    };

    this.tempList = []
  }

  handleSpeak = () => {
    this.tempList = Object.assign([], this.props.urlList);
    this.handleDisplay();
  };

  AudioIterator = () => {
    return {
      next: () => {
        if(this.tempList.length) {
          return {
            value: this.tempList.shift(),
            done: false
          }
        } else {
          return {
            done: true
          }
        }
      }
    }
  };

  handleDisplay = () => {
    const iterator = this.AudioIterator();
    let next = iterator.next();
    let url = null;
    // console.log(next, decodeURIComponent(next.value.split('&q=')[1].split('&tl=')[0]).length);
    if(!next.done) {
      url = next.value;
    } else {
      this.setState({ isPlay: false });
    }
    if(url) {
      this.player = new Audio(url);
      this.player.play();
      this.setState({ isPlay: true });
      this.player.onended = () => {
        this.handleDisplay();
      };
    } else {
      this.handleStop();
    }
  };

  handleStop = () => {
    this.player.pause();
    this.player.currentTime = 0;
    this.setState({ isPlay: false });
  };

  render() {
    const { convertedText, handleReset } = this.props;
    const { isPlay } = this.state;

    return (
        <Fragment>
          <div className="result">
            <div className="content">
              { convertedText ? <p className="text f14 text-lt-gray text-normal">{ convertedText ? convertedText:'Sorry, there is no parsed text available.' }</p>:<p className="text f14 text-lt-gray">Result goes here...</p> }
              <div className={ `eq-icon ${ isPlay ? 'visible':'invisible' }` }>
                <div className="eq-col">
                  <div className="eq-item-1-a">&nbsp;</div>
                  <div className="eq-item-1-b">&nbsp;</div>
                </div>
                <div className="eq-col">
                  <div className="eq-item-2-a">&nbsp;</div>
                  <div className="eq-item-2-b">&nbsp;</div>
                </div>
                <div className="eq-col">
                  <div className="eq-item-3-a">&nbsp;</div>
                  <div className="eq-item-3-b">&nbsp;</div>
                </div>
                <div className="eq-col">
                  <div className="eq-item-4-a">&nbsp;</div>
                  <div className="eq-item-4-b">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-wrap text-right">
            { convertedText && <button className="btn btn-primary btn-app" onClick={ handleReset } disabled={ isPlay }>Try Again</button> }
            { convertedText &&
                <Fragment>
                  { isPlay ? <button className="btn btn-danger btn-last-r" onClick={ this.handleStop }>Stop</button>:
                      <button className="btn btn-primary btn-app btn-last-r" onClick={ this.handleSpeak }>Speak</button> }
                </Fragment>
            }
          </div>
        </Fragment>
    );
  }
}

Result.propTypes = {
  convertedText: PropTypes.string.isRequired,
  urlList: PropTypes.array.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Result;
