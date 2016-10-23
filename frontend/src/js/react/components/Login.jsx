/*
Component for logging in. On success, saves the HTTP Basic
header value in a cookie.
*/
import React from 'react';
import Webservice from '../../util/Webservice.jsx'
import { hashHistory, Link } from 'react-router'
import IconImage from '../../../images/icon-green.png';

export default React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      error: null
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
    Webservice.login(this.state.username,this.state.password)
    .then(function(success) {
      if (success) {
        hashHistory.push('/');
      }
    }).catch(function(errorMessage) {
      this.setState({
        username: '',
        password: '',
        error: errorMessage
      });
    }.bind(this));
  },

  render: function () {
    return (
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4 login">
            <div className="row">
              <div className="col-xs-12">
                <img className="img-responsive center-block" src={IconImage} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h1 className="text-center">Sign in to consensus</h1>
              </div>
            </div>
            <div className="row card">
              <div className="col-xs-12">
                {this.error && <p className="error">{this.error}</p>}
                <form onSubmit={this.handleSubmit} className="form-signin">
                    <div className="formGroup">
                      <label for="email">Email address</label>
                      <input id="email" type="email" onChange={this.handleUsernameChange} className="form-control" placeholder="Email address" required autofocus/>
                    </div>
                    <div className="password">
                      <label for="password">Password</label>
                      <input type="password" id="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block btn-green" type="submit">Sign in</button>
                </form>
              </div>
            </div>
            <div className="row lightweight-card">
              <div className="col-xs-12 text-center">
                <p>New? <Link to={"/auth/register"}>Create an account.</Link></p>
              </div>
            </div>
          </div>
        </div>
    )
  }
});
