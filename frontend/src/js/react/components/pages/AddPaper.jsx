/**
 * A page for adding a paper to the database.
 */

import React from 'react'
import Webservice from '../../../util/Webservice.jsx'
import { hashHistory } from 'react-router'

export default React.createClass({
  getInitialState: function() {
    return {
      title: '',
      url: '',
      isQueryPending: false,
    }
  },

  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleURLChange: function(e) {
    this.setState({url: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({isQueryPending: true});
    Webservice.authFetch('/api/papers', {
      method: 'POST',
      body: JSON.stringify(this.state)
    }).then((success) => {
      this.setState({queryPending: false});
      if (success) {
        hashHistory.push('/');
      }
    }).catch((errorMessage) => {
      this.setState({queryPending: false});
    });
  },

  render: function () {
    return (
      <div className="row add-paper">
        <div className="col-xs-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" onChange={this.handleTitleChange} className="form-control"/>

            <div className="form-group">
              <label htmlFor="title">URL</label>
              <input type="text" name="url" onChange={this.handleURLChange} className="form-control"/>

            <button className="btn btn-lg btn-primary btn-block btn-green" type="submit">Submit {this.state.queryPending && <i className="fa fa-circle-o-notch fa-spin"></i>} </button>
          </form>
        </div>
      </div>
    )
  }
});
