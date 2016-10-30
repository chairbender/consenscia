/*
A page without a header. Renders its children in a bootstrap container.
A top level container for the app.
 */
import React from 'react';

export default React.createClass({
  componentWillMount() {
      //invert color on a headless page
      document.body.className = "inverted-page";
  },
  componentWillUnmount() {
      document.body.className = null;
  },
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
});
