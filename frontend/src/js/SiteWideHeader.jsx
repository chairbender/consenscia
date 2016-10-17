/*
The site wide header, with account controls, search bar, icon, logo, and Add a paper button
 */
import React from 'react';

module.exports = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <form className="navbar-form navbar-right">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search consensus..."/>
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Register</a></li>
          </ul>
        </div>
      </nav>
    )
  }
});
