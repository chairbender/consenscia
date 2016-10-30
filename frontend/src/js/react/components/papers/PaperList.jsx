/*
Displays a list of the newest papers, along with their
points and a link to their page.
 */

import React from 'react';
import 'fetch';
import ConsensusPercentage from './ConsensusPercentage.jsx';

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

    var papersList = this.state.papers.map(function(paper, i) {
      var votes = paper.acceptions + paper.rejections;

      return (
        <div key={i}>
          <div className="row paper">
            <div className="col-xs-1 vote-count">
              <div className="row">
                <div className="col-xs-12 count">
                  {votes}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 sublabel">
                  reviews
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-xs-2 col-md-2 col-lg-1 consensus-percent">
              <div className="row">
                <div className="col-xs-12 percent">
                  <ConsensusPercentage ratio={paper.acceptions / votes} />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 sublabel">
                  confidence
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-xs-9 col-md-9 col-lg-10 title">
              <a href={paper.url}>{paper.title}</a>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <hr />
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="paper-list">
        <div className="row">
          <div className="col-xs-12">
            <h1>Latest Papers</h1>
          </div>
        </div>
        {papersList}
      </div>
    )
  }
});
