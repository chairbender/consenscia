/*
The homepage body for the app. Renders a paper list.
 */
import React from 'react';
import PaperList from '../papers/PaperList.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <PaperList />
      </div>
    )
  }
});
