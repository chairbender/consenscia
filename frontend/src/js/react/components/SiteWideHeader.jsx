/*
The site wide header, with account controls, search bar, icon, logo, and Add a paper button
 */
import React from 'react';
import LogoImage from '../../../images/logo-green.png';
import { Link } from 'react-router'

export default React.createClass({
  render: function () {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <form className="navbar-form navbar-right">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search consensus..."/>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={"/auth/login"}>Sign In</Link>
              </li>
              <li><a href="#">Register</a></li>
            </ul>
          </div>
        </nav>
        <section id="secondary-header" className="container">
          <div className="row">
              <div className="pull-left col-xs-6">
                <img src={LogoImage} className="logo"/>
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
