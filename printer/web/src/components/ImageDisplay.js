import React, { Component, Fragment } from 'react';
import PropType from 'prop-types';
import { Stage, Layer, Rect, Image } from 'react-konva';

import 'react-html5-camera-photo/build/css/index.css';

import '../stylesheets/ImageDisplay.css';

class ImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imgW: 376,
      imgH: 400,
      imgRatio: 1
    }
    this.displayRef = React.createRef();
    this.currentWidth = window.innerWidth;
  }

  handleDragOver = (e) => {};
  handleDragLeave = (e) => {};
  handleDragEnter = (e) => {};

  componentDidMount() {
    this.loadImage();
    this.setState({ imgW: this.displayRef.current.clientWidth });

    window.addEventListener('resize', this.handleWidthChange);
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
    window.removeEventListener('resize', this.handleWidthChange);
  }

  handleWidthChange = (e) => {
    if(this.currentWidth !== e.target.innerWidth) {
      this.loadImage()
      if(this.displayRef && this.displayRef.current !== null) {
        this.setState({ imgW: this.displayRef.current.clientWidth });
      }
      this.currentWidth = e.target.innerWidth;
    }
  }

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.filename;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({
      image: this.image,
      imgRatio: (this.state.imgW/this.image.width),
      imgH: (this.state.imgW/this.image.width) * this.image.height
    });
    console.log('image ratio', (this.state.imgW/this.image.width), this.state.imgW + '/' + this.image.width);
  };

  render() {
    const { filename, textOverlay, isLoading, isMobile } = this.props;
    const { imgRatio, image, imgW, imgH } = this.state;
    const ImageWithTextOverlayElem = () => {
      return (
        <div className="image">
          <Stage width={imgW} height={imgH} className="overlay" scaleX={imgRatio} scaleY={imgRatio}>
            <Layer>
              { filename && <Image image={image} /> }

              { textOverlay.length !== 0 && textOverlay.map((i, index) => {
                return (
                  <Rect
                      x={i.bbox.x0}
                      y={i.bbox.y0}
                      width={i.bbox.x1 - i.bbox.x0}
                      height={i.bbox.y1 - i.bbox.y0}
                      fill={'green'}
                      opacity={0.3}
                      key={index}
                  />
                )
              })
              }
            </Layer>
          </Stage>
        </div>
      )
    };

    return (
      <Fragment>
        <div className={ `image-display ${ (isMobile) ? 'mobile':'' }` } ref={ this.displayRef }>
          { isLoading && <div className="spinner-border">&nbsp;</div> }
          { filename && <ImageWithTextOverlayElem/> }
        </div>
        { filename && <div className="btn-wrap text-right">
          { textOverlay && !textOverlay.length && <button className="btn btn-primary btn-app" onClick={ this.handleSubmit }>Submit</button> }
        </div>}
      </Fragment>
    );
  }
}

ImageDisplay.propTypes = {
  handleSubmit: PropType.func.isRequired,
  textOverlay: PropType.array.isRequired,
  filename: PropType.string.isRequired,
  isLoading: PropType.bool.isRequired,
  isMobile: PropType.bool.isRequired
};

export default ImageDisplay;
