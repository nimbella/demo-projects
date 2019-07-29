import React, { Component } from 'react';
import { connect } from "react-redux";
import '../stylesheets/Sidebar.css';
import { fetchUserlist, removeUsername } from "../actions";
import PropTypes from 'prop-types';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchUserlist();

    this.tmr = setInterval(() => {
      this.props.fetchUserlist(true);
    }, 2000);
  }

  componentWillUnmount() {
    this.tmr.clearInterval();
  }

  handleDelete = (username) => {
    this.props.removeUsername(username)
        .then(data => {
          if(data.returnCode === 0) {
            localStorage.removeItem('username', username);
          }
        });
  };

  render() {
    const { userlist, show } = this.props;
    const username = localStorage.getItem('username');
    return (
        <div className={ `sidebar-wrap ${ (show)? 'show-xs':'hidden-xs' } `}>
          <aside className="col-sm-4 col-md-3 sidebar padding-top-0">
            <ul className="nav nav-sidebar">
              { userlist.length ? userlist.map((i, index) => {
                return (
                    <li className={ `nav-item col-xs-6 col-sm-12 ${(i.username === username || i.active)?'active':''}` } key={ index }>
                      <span className="text box-text">{ i.username[0] }</span>&nbsp;<span className="text f18 text-normal">{ i.username }</span>
                      { (i.username === username || i.active) && <span className="glyphicon glyphicon-remove-circle pull-right text f24 text-app del-btn" onClick={ () => this.handleDelete(i.username) }></span> }
                    </li>
                )
              }):<li className="nav-item col-xs-6 col-sm-12">No user on the list</li> }
            </ul>
            <div className="col-sm-4 col-md-3 person hidden-xs">
              <span className="text f18 text-white text-semi">{ userlist.length } Person(s)</span>
            </div>
          </aside>
        </div>
    );
  }
}

Sidebar.propTypes = {
  fetchUserlist: PropTypes.func.isRequired,
  removeUsername: PropTypes.func.isRequired,
  userlist: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    userlist: state.userlist
  }
};

export default connect(mapStateToProps, { fetchUserlist, removeUsername })(Sidebar);