import React, { Component, Fragment } from 'react';
import { Receiver } from 'react-file-uploader';
import PropType from 'prop-types';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

import 'react-html5-camera-photo/build/css/index.css';

import '../stylesheets/FileUpload.css';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratio: 1,
      isCamera: false
    }
  }

  handleDragOver = (e) => {};
  handleDragLeave = (e) => {};
  handleDragEnter = (e) => {};

  handleCameraStop = () => {
    console.log('camera stop');
    this.setState({ isCamera: false })
  };

  handleCameraStart = (s) => {
    this.setState({ isCamera: true });
    console.log('camera start');
  };

  handleCameraError = (err) => {
    console.log(err);
  };

  handleTakePhoto = (dataUri) => {
    this.handleCameraStop();
    this.props.handleCamera(dataUri);
  };

  handleDropImages = (e, uploads) => {
    this.props.handleDrop(e, uploads);
  };

  handleBrowseImages = (upload) => {
    this.props.handleBrowse(upload);
  };

  render() {
    const { isLoading, isMobile } = this.props;
    const { isCamera } = this.state;
    const CameraOnMobileElem = () => {
      return (
        <Fragment>
          { isCamera && <Fragment>
            <button type="button" className="close" aria-label="Close" onClick={ this.handleCameraStop }>
              <span aria-hidden="true">&times;</span>
            </button>
            <Camera
                isMaxResolution = { true }
                onTakePhoto={ dataUri => this.handleTakePhoto(dataUri) }
                isDisplayStartCameraError = { false }
                onCameraError={ err => this.handleCameraError(err) }
                isImageMirror={ false }
                idealResolution = {{width: 2400, height: 3200}}
                idealFacingMode={ FACING_MODES.ENVIRONMENT }
                imageType={ IMAGE_TYPES.png }
                isFullscreen={ true }
            />
          </Fragment> }

          { !isLoading && <div className="btn-wrap file">
            { isCamera ? <button className="btn btn-primary btn-app excluded" onClick={ this.handleCameraStop }>Camera Stop</button>:
              <Fragment>
                <button className="btn btn-primary btn-app">Browser Images</button>
                <input type="file" name="file" accept="image/*" onChange={ e => this.handleBrowseImages(e.target.files) } multiple />
                <button className="btn btn-primary btn-app excluded" onClick={ this.handleCameraStart }>Camera Start</button>
              </Fragment>
            }
          </div> }
        </Fragment>
      )
    };

    const DragAndDropOnDeskElem = () => {
      return (
        <Receiver
          customClass={ 'dnd' }
          isOpen={ true }
          onFileDrop={ this.handleDropImages }
          onDragOver={ this.handleDragOver }
          onDragLeave={ this.handleDragLeave }
          onDragEnter={ this.handleDragEnter }
        >
          <div className="content">
            <div className="upload-icon icon">&nbsp;</div>
            <p className="text f14 text-lt-gray text-light">Drag Your Images Here<br/>(JPG, GIF, PNG)</p>
            <p className="text f14 text-lt-gray text-light">Or</p>
            <div className="btn-wrap file">
              <button className="btn btn-primary btn-app btn-shadow">Upload Images</button>
              <input type="file" name="file" accept="image/*" onChange={ e => this.handleBrowseImages(e.target.files) } multiple />
            </div>
          </div>
        </Receiver>
      )
    };
    return (
      <div className={ `file-upload ${ (isMobile) ? 'mobile':'' }` }>
        { isMobile ? <CameraOnMobileElem/>:<DragAndDropOnDeskElem/> }
      </div>
    );
  }
}

FileUpload.propTypes = {
  handleDrop: PropType.func.isRequired,
  handleBrowse: PropType.func.isRequired,
  handleCamera: PropType.func.isRequired,
  isMobile: PropType.bool.isRequired
};

export default FileUpload;
