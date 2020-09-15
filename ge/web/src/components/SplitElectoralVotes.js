import React, {Component} from 'react';
import '../SplitElectoralVotes.scss';

class SplitElectoralVotes extends Component {
  render() {
    return (
      <div className="container">
        <h5 className="title">Split Electoral Votes</h5>
        <div className="btn-group">
          <button
            onClick={this.props.onClick}
            className={`state ${this.props.ME1}`}
            value="ME1"
          >
            ME 2
          </button>
          <button
            onClick={this.props.onClick}
            value="ME2"
            className={this.props.ME2}
          >
            1
          </button>
          <button
            onClick={this.props.onClick}
            value="ME3"
            className={this.props.ME3}
          >
            1
          </button>
        </div>
        <div className="btn-group">
          <button
            onClick={this.props.onClick}
            className={`state ${this.props.NE1}`}
            value="NE1"
          >
            NE 2
          </button>
          <button
            onClick={this.props.onClick}
            value="NE2"
            className={this.props.NE2}
          >
            1
          </button>
          <button
            onClick={this.props.onClick}
            value="NE3"
            className={this.props.NE3}
          >
            1
          </button>
          <button
            onClick={this.props.onClick}
            value="NE4"
            className={this.props.NE4}
          >
            1
          </button>
        </div>
      </div>
    );
  }
}

export default SplitElectoralVotes;
