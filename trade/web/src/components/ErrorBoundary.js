import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
          <div>
            <h2 className="text text-gray">Oops, something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }} className="text text-gray">
              { this.state.error && this.state.error.toString() }
              <br />
              { this.state.errorInfo.componentStack }
            </details>
          </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}