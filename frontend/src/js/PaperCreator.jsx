import React from 'react';
import 'fetch';

module.exports = React.createClass({
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
    fetch('/api/papers', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state)
    })
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="title">Title</label>
        <input type="text" name="title" onChange={this.handleTitleChange}></input>
        <label for="title">URL</label>
        <input type="text" name="url" onChange={this.handleURLChange}></input>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
});
