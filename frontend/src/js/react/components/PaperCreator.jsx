import React from 'react'
import Webservice from '../../util/Webservice.jsx'
import 'fetch'

export default React.createClass({
  getInitialState: function() {
    return {
      title: '',
      url: ''
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
    Webservice.authFetch('/api/papers', {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={this.handleTitleChange}></input>
        <label htmlFor="title">URL</label>
        <input type="text" name="url" onChange={this.handleURLChange}></input>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
});
