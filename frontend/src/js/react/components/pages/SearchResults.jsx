/*
Displays a list of papers based on a search query
 */
import React from 'react';
import PaperList from '../papers/PaperList.jsx';

export default React.createClass({
  propTypes: {
    params: React.PropTypes.shape({
      /*
      The search term to use
       */
      query: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function () {
    return {
      results: [],
      searchPending: true,
    }
  },

  componentDidMount: function() {
    //search for the papers using the specified query
    fetch('/api/papers/search/' + this.props.params.query)
    .then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({results: data, searchPending: false});
    }).catch((errorMessage) => {
      this.setState({searchPending: false});
    });
  },

  render() {
    return (
      <div className="paper-list">
        <div className="row">
          <div className="col-xs-12">
            <h1>Paper Titles Matching '{this.props.params.query}'</h1>
          </div>
        </div>
        <PaperList papers={this.state.results} />
      </div>
    )
  }
});
