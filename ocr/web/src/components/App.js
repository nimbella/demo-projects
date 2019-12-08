import React, { Component, Fragment } from 'react';
import { upload } from "../actions";

import Header from './Header';
import FileUpload from './FileUpload';
import Result from './Result'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queueList: [],
      filename: '',
      ln: 'en-US',
      ttsLn: 'eng'
    };
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      queueList: [],
      filename: ''
    });
  };

  handleLanguageSelect = (e) => {
    const ln = e.target.value;
    let ttsLn = '';

    switch(ln) {
      case 'en-US':
        ttsLn = 'eng';
        break;
      case 'es-ES':
        ttsLn = 'spa';
        break;
      case 'cmn-CN':
        ttsLn = 'chi_tra';
        break;
      default:
        ttsLn = 'eng';
    }
    this.setState({ ln, ttsLn });
  };

  handleDrop = (e, uploads) => {
    this.handleUpload(uploads.map(i => i.data));
  };

  handleBrowse = (upload) => {
    console.log(upload);
    this.handleUpload(upload);
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
    this.handleUpload([_dataURLtoFile(d, filename)]);
  };

  handleUpload = (file) => {
    let queueList = new Array(file.length).fill({ isLoading: true });
    this.setState({ queueList });

    for(let i = 0; i < file.length; i++) {
      const filename = file[i].name;
      upload(file[i])
          .then(res => {
            const { imageUrl, statusCode } = res;
            if (statusCode.toString() === '200' && this.state.queueList.length) {
              queueList[i] = { imageUrl, filename, textOverlay: [] };
              this.setState({queueList});
            }
          });
    }
  };

  isMobileDevice = () => {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent));
  };

  render() {
    const { queueList, ln, ttsLn } = this.state;
    // console.log('queue list', queueList);
    return (
        <Fragment>
          <Header/>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <h2 className="text f30 text-app text-semi">Introduction</h2>
                <p className="text f14 text-lt-gray text-normal">Optical Character Recognition (OCR) application is to convert images into text by calling serverless functions.
                </p>
                <h2 className="text f30 text-app text-semi">Application</h2>

                <span className="text f14 text-lt-gray text-normal">Language: </span>
                <div className="styled-select">
                  <select name="" id="" onChange={ this.handleLanguageSelect } value={ ln }>
                    <option value="en-US">English</option>
                    <option value="es-ES">Spanish</option>
                    <option value="cmn-CN">Chinese</option>
                  </select>
                </div>

                <div className="clearfix more-space" />

                <div className="divider-10">&nbsp;</div>
                <div className="row">
                  <div className="col-md-12">
                    {queueList && queueList.length === 0 && <FileUpload
                        handleDrop={ this.handleDrop }
                        handleBrowse={ this.handleBrowse }
                        handleCamera={ this.handleCamera }
                        isLoading={ queueList.length }
                        isMobile={ this.isMobileDevice() }
                    />}

                    {queueList && queueList.length !== 0 && <p className='text f14 text-lt-gray text-normal'>Click on {this.isMobileDevice() ? 'flip buttons' : 'uploaded images'} to see converted text or <button
                        className='text text-btn' onClick={this.handleReset}>Try Again</button></p>}
                  </div>

                  <section className="result-section">
                    {queueList.length !== 0 && queueList.map((i, index) => (
                      <div className="col-md-4" key={index}>
                        {!i.isLoading && <Result
                            imageUrl={ i.imageUrl }
                            filename={ i.filename }
                            ttsLn={ ttsLn }
                            ln={ ln }
                            isLoading={ i.isLoading }
                            isMobileDevice={ this.isMobileDevice() }
                        />}

                        {i.isLoading && <div className="result-item">
                          <div className={ `image-display ${ (this.isMobileDevice) ? 'mobile':'' }` }>
                            <div className="spinner-border">&nbsp;</div>
                          </div>
                        </div>}
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default App;
