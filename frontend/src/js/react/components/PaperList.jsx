import React from 'react';
import 'fetch';

export default React.createClass({
  getInitialState: function () {
    return {
      papers: []
    }
  },

  componentDidMount: function() {
    //get the list of papers
    //from the webservice
    fetch('/api/papers')
    .then(function (response) {
      return response.json()
    }).then(function(papers) {
      this.setState({
        papers: papers
      })
    }.bind(this));
  },

  render: function () {
    var papersList = this.state.papers.map(function(paper) {
      return (
        <ul>
          <a href={paper.url}>{paper.title}</a>
        </ul>
      );
    });
    return (
      <li>
        {papersList}
      </li>
    )
  }
});
