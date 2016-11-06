/*
The site wide header, with account controls, search bar, icon, logo,
and Add a paper button
 */
import React from 'react';
import LogoImage from '../../../../images/logo-green.png';
import { Link } from 'react-router'
import Webservice from '../../../util/Webservice.jsx'

export default React.createClass({
  propTypes: {
    //username to display. If null, the login and
    //register links are displayed instead of the username
    //and logout links.
    username: React.PropTypes.string,
    //function to invoke when logout succeeds and
    //credential cookie has been cleared
    onLogoutSuccess: React.PropTypes.func
  },

  handleLogout: function(e) {
    e.preventDefault();
    Webservice.logout();
    this.props.onLogoutSuccess();
  },

  render: function () {
    var loggedInCase = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#">{this.props.username}</a>
        </li>
        <li>
          <a href="#" onClick={this.handleLogout}>Log Out</a>
        </li>
      </ul>
    );

    var anonymousCase = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to={"/auth/login"}>Sign In</Link>
        </li>
        <li><Link to={"/auth/register"}>Register</Link></li>
      </ul>
    )


    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <form className="navbar-form navbar-right">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search consensus..."/>
              </div>
            </form>
            {this.props.username ? loggedInCase : anonymousCase}
          </div>
        </nav>
        <section id="secondary-header" className="container">
          <div className="row">
              <div className="pull-left col-xs-6">
                <Link to={"/"}><img src={LogoImage} className="logo"/></Link>
              </div>
              <div className="col-xs-6">
                <button type="button" className="btn btn-gray">Add a Paper</button>
              </div>
          </div>
        </section>
      </div>
    )
  }
});
