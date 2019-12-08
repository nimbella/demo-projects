import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import uuid from 'react-uuid';
import { imageToText, createSpeakURL, progress } from "../actions";

import ImageDisplay from './ImageDisplay';
import TextDisplay from './TextDisplay';

import '../stylesheets/Result.css'

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
      progress: 0,
      textOverlay: [],
      tts: [],
      error: '',
      status: 'waiting...',
      timeoutCount: 0
    };

    this.intervalDuration = 1000;
  }

  componentDidMount() {
    const id = uuid();
    const { filename, ttsLn, ln, imageUrl } = this.props;
    let count = 0;
    let timeoutCount = this.state.timeoutCount;
    this.progressInterval = setInterval(() => {
      progress(id).then(r => {
        let { progress, status, text = '' } = r;
        progress = Math.floor(progress * 100);
        this.setState({ progress, status, isLoading: false });

        if(text !== '') {
          this.handleImageToTextData(r, ln);
        }

        if(timeoutCount >= (120000/this.intervalDuration)) {
          if(this.progressInterval) {
            clearInterval(this.progressInterval);
          }
          this.setState({ error: `Failed to recognize text: ${filename}` });
        } else {
          timeoutCount++;
          this.setState({ timeoutCount })
        }

        if(progress >= 100 && text === '') {
          if(count < 10) {
            count++;
          } else {
            if(this.progressInterval) {
              clearInterval(this.progressInterval);
            }
            this.setState({ error: `Failed to recognize text: ${filename}` });
          }
        }
      })
    }, this.intervalDuration);

    try {
      imageToText(imageUrl, ttsLn, id)
          .then(data => {
            if(data.text) {
              this.handleImageToTextData(data, ln);
            } else {
              console.log('error', data)
            }
          })
          .catch(error => {
            console.log('error', error)
          })
    }
    catch (err) {throw err}
  }

  componentWillUnmount() {
    if(this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  handleImageToTextData = (data, ln) => {
    if(this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    const textOverlay = data.textOverlay;
    const convertedText = data.text.replace(/ +(?= )/g, '');
    const parsedText = convertedText.replace(/(\r\n|\n|\r)/gm," ");
    if(parsedText) {
      createSpeakURL({ text: parsedText, lang: ln })
          .then(data => {
            this.setState({ textOverlay, convertedText, tts: data.url });
          });
    }
  };

  handleFlip = e => {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  };

  render() {
    const { isMobileDevice, imageUrl, isLoading, ln } = this.props;
    const { isFlipped, textOverlay, convertedText, error, progress, status, tts, timeoutCount } = this.state;
    return (
        <div className="result-item">
          {!error && <ReactCardFlip isFlipped={ isFlipped } flipDirection='horizontal'>
            <ImageDisplay
                textOverlay={ textOverlay }
                imageUrl={ imageUrl }
                isLoading={ isLoading }
                progress={ progress }
                status={ status }
                timeoutCount={ timeoutCount }
                intervalDuration={ this.intervalDuration }
                isMobile={ isMobileDevice }
                convertedText={ convertedText }
                handleFlip={ this.handleFlip }
            />

            <TextDisplay
                convertedText={ convertedText }
                tts={ tts }
                ln={ ln }
                handleFlip={ this.handleFlip }
            />
          </ReactCardFlip>}

          {error && <div className="result-item">
            <div className={ `image-display ${ (isMobileDevice) ? 'mobile':'' }` }>
              <p className='text-danger display-error'>{ error }</p>
            </div>
            </div>}

          {isMobileDevice && !error && <div className="btn-wrap">
            <button className="btn btn-outline-app" onClick={this.handleFlip}>Flip</button>
          </div>}
        </div>
    );
  }
}

Result.propTypes = {
  filename: PropTypes.string,
  imageUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  isMobileDevice: PropTypes.bool,
  ttsLn: PropTypes.string,
  ln: PropTypes.string
};

export default Result;
