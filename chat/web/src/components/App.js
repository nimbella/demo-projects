import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import Form from './Form';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showSidebar: false
    }
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    if(!username) {
      this.setState({
        showForm: true
      })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const username = localStorage.getItem('username');
    if(nextProps.userlist.filter(curr => curr.username === username).length) {
      this.setState({ showForm: false });
    } else {
      this.setState({ showForm: true });
    }
  };

  handleCloseForm = () => {
    this.setState({
      showForm: false
    })
  };

  handleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    const { showForm, showSidebar } = this.state;
    return (
        <Fragment>
          { showForm && <Form fn={ this.handleCloseForm }/> }
          <Header fn={ this.handleSidebar } show={ showSidebar }/>
          <div className="container-fluid">
            <div className="row">
              <Sidebar show={ showSidebar }/>
              <Main/>
            </div>
          </div>
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userlist: state.userlist
  }
};

export default connect(mapStateToProps, null)(App);
