/*
Registration page.
*/
import React from 'react';
import Webservice from '../../../util/Webservice.jsx'
import IconImage from '../../../../images/icon-green.png';
import RegisterButton from '../authentication/RegisterButton.jsx'


export default React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: null
    }
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handlePasswordConfirmationChange: function(e) {
    this.setState({passwordConfirmation: e.target.value});
  },

  onRegisterError: function(errorMessage) {
    this.setState({
      email: '',
      password: '',
      passwordConfirmation: '',
      error: errorMessage
    });
  },

  render: function () {
    return (
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4 register">
            <div className="row">
              <div className="col-xs-12">
                <img className="img-responsive center-block" src={IconImage} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h1 className="text-center">Create an account</h1>
              </div>
            </div>
            <div className="row card">
              <div className="col-xs-12">
                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
                <form className="form-signin">
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input id="email" type="email" onChange={this.handleEmailChange} className="form-control" placeholder="Email address" required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password-confirmation">Confirm password</label>
                      <input type="password" id="password-confirmation" onChange={this.handlePasswordConfirmationChange} className="form-control" placeholder="Password" required/>
                    </div>
                    <RegisterButton email={this.state.email} password={this.state.password} passwordConfirmation={this.state.passwordConfirmation} onRegisterError={this.onRegisterError}  />
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
});
