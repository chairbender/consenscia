/*
A regular page with a site header. Renders its children in a bootstrap container.
The top level structure of the app.
 */
import SiteWideHeaderContainer from '../../../redux/containers/SiteWideHeaderContainer.jsx';
import React from 'react';

export default React.createClass({
  componentWillMount() {
      //restore color on a normal page
      document.body.className = null;
  },
  render() {
    return (
      <div>
        <SiteWideHeaderContainer />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
});
