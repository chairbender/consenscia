/*
A registration button, which attempts to register using credentials supplied
as props and displays a spinner while loading. Redirects to homepage
on success and logs in. Invokes a callback if an error occurs.
*/
import React from 'react';
import Webservice from '../../../util/Webservice.jsx'
import { hashHistory } from 'react-router'


export default React.createClass({
  propTypes: {
    //email to use when registering this user. Will
    //be used as the email and username
    email: React.PropTypes.string.isRequired,
    //plaintext password to use for this account
    password: React.PropTypes.string.isRequired,
    //for password confirmation. error returned during
    //registration if this doesn't match password
    passwordConfirmation: React.PropTypes.string.isRequired,
    //callback to invoke when registration fails.
    //passes the failure string as the first argument
    onRegisterError: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      queryPending: false
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    //confirm that passwords match
    if (this.props.password != this.props.passwordConfirmation) {
      this.props.onRegisterError('Passwords do not match.');
    } else {
      this.setState({queryPending: true});
      Webservice.register(this.props.email,this.props.password)
      .then(function(success) {
        this.setState({queryPending: false});
        if (success) {
          hashHistory.push('/');
        }
      }.bind(this)).catch(function(errorMessage) {
        this.setState({queryPending: false});
        this.props.onRegisterError(errorMessage);
      }.bind(this));
    }
  },

  render: function () {
    return (
        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block btn-green" type="submit">
          Create account {this.state.queryPending && <i className="fa fa-circle-o-notch fa-spin"></i>}
        </button>
    )
  }
});
