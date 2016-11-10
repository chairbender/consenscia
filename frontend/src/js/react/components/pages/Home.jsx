/*
The homepage body for the app. Renders a paper list.
 */
import React from 'react';
import LatestPapers from '../papers/LatestPapers.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <LatestPapers />
      </div>
    )
  }
});
