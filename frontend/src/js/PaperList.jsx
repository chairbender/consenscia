import React from 'react';
import 'fetch';

module.exports = React.createClass({
  getInitialState: function () {
    //get the list of papers
    //from the webservice
    fetch('./api/papers')
      .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        } else {
          console.log('Looks like there was NOT a problem. Status Code: ' +
            response.status);
        }
      });

    return {
      name: 'Tyler McGinnis'
    }
  },
  render: function () {
    return (
      <div>
        and this is the <b>{this.props.name}</b>.
      </div>
    )
  }
});
