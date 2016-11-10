/*
Displays a list of papers.
 */

import React from 'react';
import 'fetch';
import ConsensusPercentage from './ConsensusPercentage.jsx';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    //array of papers to render
    papers: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
      url: React.PropTypes.string,
      title: React.PropTypes.string,
      acceptions: React.PropTypes.number,
      rejections: React.PropTypes.number
    }))
  },

  render: function () {
    var papersList = this.props.papers.map(function(paper, i) {
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
                  {votes > 0 && 'confidence'}
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-xs-9 col-md-9 col-lg-10 title">
              <Link to={"/paper/" + paper.id}>{paper.title}</Link>
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
        {papersList}
      </div>
    )
  }
});
