/*
Displays a list of the newest papers, along with their
points and a link to their page.
 */

import React from 'react';
import 'fetch';
import PaperList from './PaperList.jsx';

export default React.createClass({
  getInitialState: function () {
    return {
      papers: []
    }
  },

  componentDidMount: function() {
    //get the list of papers
    //from the webservice
    fetch('/api/papers/latest')
    .then(function (response) {
      return response.json()
    }).then(function(papers) {
      this.setState({
        papers: papers
      })
    }.bind(this));
  },

  render: function () {
      return (
        <div className="paper-list">
          <div className="row">
            <div className="col-xs-12">
              <h1>Latest Papers</h1>
            </div>
          </div>
          <PaperList papers={this.state.papers} />
        </div>
      );
  }
});
