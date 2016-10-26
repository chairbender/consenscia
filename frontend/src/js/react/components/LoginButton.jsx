/*
A login button, which attempts to login using credentials supplied
as props and displays a spinner while loading. Redirects to homepage
on success. Invokes a callback if an error occurs.

Props:
username - username to use to login
password - plaintext password to use to login
onLoginError(errorMessage) - callback to invoke if login fails. errorMessage
  is a string describing the exact error.
*/
import React from 'react';
import Webservice from '../../util/Webservice.jsx'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'


export default React.createClass({
  getInitialState: function() {
    return {
      queryPending: false
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({queryPending: true});
    Webservice.login(this.props.username,this.props.password)
    .then(function(success) {
      this.setState({queryPending: false});
      if (success) {
        this.props.onLoginSuccess(this.props.username,this.props.password);
        hashHistory.push('/');
      }
    }.bind(this)).catch(function(errorMessage) {
      this.setState({queryPending: false});
      this.props.onLoginError(errorMessage);
    }.bind(this));
  },

  render: function () {
    return (
        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block btn-green" type="submit">
          Sign in {this.state.queryPending && <i className="fa fa-circle-o-notch fa-spin"></i>}
        </button>
    )
  }
});
