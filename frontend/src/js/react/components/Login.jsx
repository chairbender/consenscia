/*
Login form.
*/
import React from 'react';
import Webservice from '../../util/Webservice.jsx'
import { Link } from 'react-router'
import IconImage from '../../../images/icon-green.png';
import LoginButtonContainer from '../../redux/containers/LoginButtonContainer.jsx'


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

  onLoginError: function(errorMessage) {
    this.setState({
      username: '',
      password: '',
      error: errorMessage
    });
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
                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
                <form className="form-signin">
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input id="email" type="email" onChange={this.handleUsernameChange} className="form-control" placeholder="Email address" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
                    </div>
                    <LoginButtonContainer username={this.state.username} password={this.state.password} onLoginError={this.onLoginError}  />
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
