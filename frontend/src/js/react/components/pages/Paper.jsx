/**
 * Detail page for a paper. Provides a view of the title and abstract, and controls
 * for voting on it, as well as a link to the paper itself.
 */
 import React from 'react';
 import ConsensusPercentage from '../papers/ConsensusPercentage.jsx';

 export default React.createClass({
   propTypes: {
     /*
     The ID of the paper to render
      */
     params: React.PropTypes.shape({
       paperId: React.PropTypes.string.isRequired
     })
   },

   getInitialState: function () {
     return {
       paper: {
         acceptions: 0,
         rejections: 0,
         title: '',
         abstract: '',
         url: '',
       },
       review: null;
     }
   },

   componentDidMount: function() {
     //get the specific paper from the webservice along
     //with the user's rating status for that paper
     fetch('/api/papers/detail/' + this.props.params.paperId)
     .then(function (response) {
       return response.json()
     }).then(function(data) {
       this.setState(data);
     }.bind(this));
   },

   render() {
     var votes = this.state.paper.acceptions + this.state.paper.rejections;
     var acceptionClass = "col-xs-2 acceptions ";
     var rejectionClass = "col-xs-2 rejections ";
     if (this.state.review != null) {
       if (this.state.review.accept) {
         acceptionClass += "selected";
       } else {
         rejectionClass += "selected";
       }
     }

     return (
       <div className="paper-detail">
         <div className="row summary">
           <div className="col-xs-2">
             {votes}
           </div>
           <div className="col-xs-2">
             <ConsensusPercentage ratio={this.state.paper.acceptions / votes} />
           </div>
         </div>
         <div className="row votes">
           <div className={acceptionClass}>
             <i className="fa fa-check-circle" aria-hidden="true"></i> {this.state.paper.acceptions}
           </div>
           <div className={rejectionClass}>
             <i className="fa fa-times-circle" aria-hidden="true"></i> {this.state.paper.rejections}
           </div>
         </div>
         <div className="row">
           <div className="col-xs-12 title">
             {this.state.title}
           </div>
         </div>
         <div className="row">
           <div className="col-xs-12 abstract">
             {this.state.abstract}
           </div>
         </div>
         <div className="row summary">
           <div className="col-xs-2">
             {votes}
           </div>
           <div className="col-xs-2">
             <ConsensusPercentage ratio={this.state.paper.acceptions / votes} />
           </div>
         </div>
         <div className="row votes">
           <div className={acceptionClass}>
             <i className="fa fa-check-circle" aria-hidden="true"></i> {this.state.paper.acceptions}
           </div>
           <div className={rejectionClass}>
             <i className="fa fa-times-circle" aria-hidden="true"></i> {this.state.paper.rejections}
           </div>
         </div>
       </div>
     )
   }
 });
