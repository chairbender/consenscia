import React from 'react'
import Child from './Child.jsx'

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <div> This is the parent. </div>
        <Child name="child"/>
      </div>
    )
  }
});
