import React, { Component, Fragment } from 'react';
import { upload } from "../actions";

import Header from './Header';
import FileUpload from './FileUpload';
import ImageDisplay from './ImageDisplay';
import Result from './Result';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textOverlay: [],
      convertedText: '',
      parsedText: '',
      filename: '',
      url: [],
      ln: 'en',
      ttsLn: 'eng',
      isLoading: false
    };
  }

  componentDidMount() {
  }

  handleITTSubmit = (file) => {
    this.setState({ isLoading: true });
  };

  handleReset = () => {
    this.setState({
      textOverlay: [],
      convertedText: '',
      parsedText: '',
      filename: '',
      url: [],
      ln: 'en',
      ttsLn: 'eng',
      isLoading: false
    });
  };

  handleLanguageSelect = (e) => {
    const ln = e.target.value;
    let ttsLn = '';

    switch(ln) {
      case 'en':
        ttsLn = 'eng';
        break;
      case 'es':
        ttsLn = 'spa';
        break;
      case 'zh':
        ttsLn = 'chi_tra';
        break;
      default:
        ttsLn = 'eng';
    }
    this.setState({ ln, ttsLn });
  };

  handleDrop = (e, uploads) => {
    const file = uploads[0].data;
    this.handleUpload(file);
  };

  handleBrowse = (upload) => {
    const file = upload[0];
    this.handleUpload(file);
  };

  handleCamera = (d) => {
    const filename = 'mobile_' + new Date().getHours() + new Date().getMinutes() + '.png';

    const _dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type:mime });
    };

    this.handleUpload(_dataURLtoFile(d, filename));
  };

  handleUpload = (file) => {
    this.setState({ isLoading: true })
    upload(file)
      .then(res => {
        const { filename, statusCode } = res;
        if (statusCode.toString() === '200') {
          this.setState({ filename, isLoading: false })
        }
      });
  };

  isMobileDevice = () => {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  };

  render() {
    const { textOverlay, convertedText, filename, url, isLoading, ln } = this.state;
    return (
        <Fragment>
          <Header/>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <h2 className="text f30 text-app text-semi">Introduction</h2>
                <p className="text f14 text-lt-gray text-normal">Job Processing application. Upload a file and receive notification to further handle processing.
                </p>
                <div className="clearfix more-space" />

                <div className="divider-10">&nbsp;</div>
                <div className="row">
                    {filename && <ImageDisplay
                        textOverlay={ textOverlay }
                        filename={ filename }
                        isLoading={ isLoading }
                        isMobile={ this.isMobileDevice() }
                        handleSubmit={ this.handleITTSubmit }
                    />}
                    {!filename&& <FileUpload
                        handleDrop={ this.handleDrop }
                        handleBrowse={ this.handleBrowse }
                        handleCamera={ this.handleCamera }
                        isLoading={ isLoading }
                        isMobile={ this.isMobileDevice() }
                    />}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default App;
