/*
Component for logging in. On success, saves the HTTP Basic
header value in a cookie.
*/
import React from 'react';
import Authentication from '../../util/Authentication.jsx'
import 'fetch';
import { hashHistory } from 'react-router'

export default React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },

  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    fetch('/api/users/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state)
    }).then(function(response) {
      if (!response.ok) {
        this.setState({
          username: '',
          password: '',
          error: 'Server error occurred trying to log in.'
        });
      } else {
        return response.json();
      }
    }.bind(this)).then(function(loginSuccess) {
      if (loginSuccess) {
        //store the base-64 encoded string for authenticating future calls
        Authentication.setCredentials(this.state.username, this.state.password);
        hashHistory.push('/');
      } else {
        this.setState({
          username: '',
          password: '',
          error: 'Invalid username / password combination'
        });
      }
    }.bind(this));
  },

  render: function () {
    return (
        <div class="row">
          <div className="col-xs-4 col-xs-offset-4 login">
            <p class="error">{this.error}</p>
            <form onSubmit={this.handleSubmit} className="form-signin">
                <input type="email" onChange={this.handleUsernameChange} className="form-control" placeholder="Email address" required autofocus/>
                <input type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          </div>
        </div>
    )
  }
});
