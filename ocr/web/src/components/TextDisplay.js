import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/TextDisplay.css';

class TextDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlay: false
    };

    this.tempList = [];
    this.synth = window.speechSynthesis;
  }

  componentDidMount() {
    if(this.props.convertedText) {
      this.msg = new SpeechSynthesisUtterance(this.props.convertedText.toString());
      this.handleLang(this.msg);
    }
  }

  handleSpeak = async () => {
    console.log(window.speechSynthesis);
    if(this.handleBrowser() === 'ie' || this.handleBrowser() === 'safari') {
      this.tempList = Object.assign([], this.props.tts);
      this.handleDisplay();

    } else {
      this.handleStop();

      this.msg = new SpeechSynthesisUtterance(this.props.convertedText.toString());
      this.handleLang(this.msg);

      this.synth.speak(this.msg);
      this.setState({ isPlay: true });

      this.msg.onstart = e => {
        console.log('speech start', e);
        this.setState({ isPlay: true })
      };

      this.msg.onend = e => {
        console.log('speech end', e);
        this.setState({ isPlay: false });
      }
    }
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
      this.player.onerror = () => {
        alert('The text seems contains not text-to-speech friendly characters.');
        this.handleStop();
      }
    } else {
      this.handleStop();
    }
  };

  handleStop = () => {
    if(this.handleBrowser() === 'ie' || this.handleBrowser() === 'safari') {
      this.player.pause();
      this.player.currentTime = 0;
    } else {
      this.synth.cancel();
    }
    this.setState({ isPlay: false });
  };

  componentWillUnmount() {
    if(this.player || this.synth) {
      this.handleStop();
    }
  }

  handleBrowser = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf('safari') !== -1) {
      if(ua.indexOf('chrome') > -1) {
        return 'chrome'
      } else {
        return 'safari'
      }
    }
    if(ua.indexOf('msie') !== -1) {
      return 'ie'
    }
    return ua;
  };

  handleLang = (msg) => {
    const { ln } = this.props;
    switch(ln) {
      case 'en-US':
        msg.voice = window.speechSynthesis.getVoices()[32];
        break;
      case 'es-ES':
        msg.voice = window.speechSynthesis.getVoices()[14];
        break;
      case 'cmn-CN':
        msg.voice = window.speechSynthesis.getVoices()[25];
        break;
      default:
        msg.voice = window.speechSynthesis.getVoices()[32];
    }
  };

  render() {
    const { convertedText, handleFlip } = this.props;
    const { isPlay } = this.state;
    return (
        <Fragment>
          <div className="text-display">
            <div className="content" onClick={handleFlip}>
              { convertedText ? <p className="text f14 text-lt-gray text-normal">{ convertedText ? convertedText:'Sorry, there is no parsed text available.' }</p>:<p className="text f14 text-lt-gray">Loading...</p> }
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

            <div className="btn-wrap text-right">
              { convertedText &&
              <Fragment>
                { isPlay ? <button className="btn btn-danger" onClick={ this.handleStop }>Stop</button>:
                    <button className="btn btn-primary btn-app" onClick={ this.handleSpeak }>Speak</button> }
              </Fragment>
              }
            </div>
          </div>


        </Fragment>
    );
  }
}

TextDisplay.propTypes = {
  handleFlip: PropTypes.func.isRequired,
  convertedText: PropTypes.string,
  tts: PropTypes.array,
  ln: PropTypes.string.isRequired
};

export default TextDisplay;
