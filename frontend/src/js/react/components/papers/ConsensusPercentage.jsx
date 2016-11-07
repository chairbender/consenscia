/*
Given a ratio (from 0 to 1), enders a percentage in a span that is colored and weighted based
on how close to 100 it is. If ratio is Nan, renders nothing
 */
 import React from 'react';
 import Chromath from 'chromath';
 import Constants from '../../../Constants.jsx';


export default React.createClass({
  propTypes: {
    /*
    Ratio between 0 and 1 which will be rendered as a percentage. Can be NaN. If
    so, no number will be rendered
     */
    ratio: React.PropTypes.number
  },

  render() {
    if (isNaN(this.props.ratio)) {
      return (<span></span>);
    } else {
      var percent = (this.props.ratio * 100).toFixed(0);
      var weight = Math.max((this.props.ratio * (6)).toFixed(0) * 100,100);
      var color = Chromath.towards(Constants.rejectionColor,Constants.acceptionColor,this.props.ratio);

      var percentStyle = {
        color: color.toString(),
        fontWeight: weight.toString()
      };

      return (
        <span style={percentStyle}>{percent}%</span>
      );
    }
  }
});
