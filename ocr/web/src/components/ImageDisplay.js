import React, {Component, Fragment} from 'react';
import PropType from 'prop-types';
import { Stage, Layer, Rect, Image } from 'react-konva';
import { Progress } from 'reactstrap'

import 'react-html5-camera-photo/build/css/index.css';

import '../stylesheets/ImageDisplay.css';

class ImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imgW: 376,
      imgH: 400,
      imgRatio: 1,
      // progress: 0
    };
    this.displayRef = React.createRef();
    this.currentWidth = window.innerWidth;
    this.interval = null;
  }

  handleDragOver = (e) => {};
  handleDragLeave = (e) => {};
  handleDragEnter = (e) => {};

  componentDidMount() {
    this.loadImage();
    this.setState({ imgW: this.displayRef.current.clientWidth });
    window.addEventListener('resize', this.handleWidthChange);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.imageUrl !== prevProps.imageUrl) {
      console.log('props changed');
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
    window.removeEventListener('resize', this.handleWidthChange);
    clearInterval(this.interval);
  }

  handleWidthChange = (e) => {
    if(this.currentWidth !== e.target.innerWidth) {
      this.loadImage();
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
    this.image.src = this.props.imageUrl;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({
      image: this.image,
      imgRatio: (this.state.imgW/this.image.width),
      imgH: (this.state.imgW/this.image.width) * this.image.height
    });
    // console.log('image ratio', (this.state.imgW/this.image.width), this.state.imgW + '/' + this.image.width);
  };

  render() {
    const { imageUrl, textOverlay, isLoading, isMobile, handleFlip, progress, status, timeoutCount, intervalDuration } = this.props;
    const { imgRatio, image, imgW, imgH } = this.state;
    // console.log('image display', image);
    const ImageWithTextOverlayElem = () => {
      return (
        <div className="image" onClick={handleFlip}>
          <Stage width={imgW} height={imgH} className='overlay' scaleX={imgRatio} scaleY={imgRatio}>
            <Layer>
              { image && <Image image={image} /> }

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
          { progress !== undefined && textOverlay.length === 0 && <div className='progress-wrap'>
            <p>
              { status } {progress <= 100 && <Fragment>{progress}%</Fragment>}<br />
              {(120000/intervalDuration) - timeoutCount} seconds before timeout
            </p>
            <Progress color='info' max={100} value={progress}/>
          </div>}
          { imageUrl && <ImageWithTextOverlayElem/> }
        </div>
      </Fragment>
    );
  }
}

ImageDisplay.propTypes = {
  handleFlip: PropType.func.isRequired,
  textOverlay: PropType.array,
  imageUrl: PropType.string,
  isLoading: PropType.bool,
  progress: PropType.number,
  status: PropType.string,
  timeoutCount: PropType.number,
  intervalDuration: PropType.number,
  isMobile: PropType.bool
};

export default ImageDisplay;
