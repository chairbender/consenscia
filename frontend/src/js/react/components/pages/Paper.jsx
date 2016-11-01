/**
 * Detail page for a paper. Provides a view of the title and abstract, and controls
 * for voting on it, as well as a link to the paper itself.
 */
 import React from 'react';
 import ConsensusPercentage from '../papers/ConsensusPercentage.jsx';
 import Webservice from '../../../util/Webservice.jsx'

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
       review: null,
       acceptPending: false,
       rejectPending: false
     }
   },

   componentDidMount: function() {
     //get the specific paper from the webservice along
     //with the user's rating status for that paper
     //TODO: Allow if not logged in
     Webservice.authFetch('/api/papers/detail/' + this.props.params.paperId)
     .then(function (response) {
       return response.json()
     }).then(function(data) {
       this.setState(data);
     }.bind(this));
   },

   handleAccept: function(e) {
     e.preventDefault();
     this.setState({acceptPending: true});
     Webservice.authFetch('/api/reviews/accept/' + this.props.params.paperId)
     .then((response) => {
       this.setState({acceptPending: false});
       return response.json();
     }).then((data) => {
       this.setState(data);
     });
   },

   handleReject: function(e) {
     e.preventDefault();
     this.setState({rejectPending: true});
     Webservice.authFetch('/api/reviews/reject/' + this.props.params.paperId)
     .then((response) => {
       this.setState({rejectPending: false});
       return response.json();
     }).then((data) => {
       this.setState(data);
     });
   },

   render() {
     var votes = this.state.paper.acceptions + this.state.paper.rejections;
     var acceptButtonClass = "btn btn-gray ";
     var rejectButtonClass = "btn btn-gray ";
     var hasAccepted = this.state.review != null && this.state.review.accept;
     var hasRejected = this.state.review != null && !this.state.review.accept;
     if (hasAccepted) {
       acceptButtonClass += "selected";
     }
     if (hasRejected) {
       rejectButtonClass += "selected";
     }

     return (
       <div className="paper-detail">
         <div className="row">
           <div className="col-xs-12 title">
             <a href={this.state.paper.url}>{this.state.paper.title}</a>
           </div>
         </div>
         <div className="row summary">
           <div className="col-xs-12">
             {votes > 0 && <div><ConsensusPercentage ratio={this.state.paper.acceptions / votes} /> confidence</div>}
             {votes == 0 && <span>No Reviews</span>}
           </div>
         </div>
         <div className="row votes">
           <div className="col-xs-2 acceptions">
             <i className="fa fa-check-circle" aria-hidden="true"></i> {this.state.paper.acceptions}
           </div>
           <div className="col-xs-2 rejections">
             <i className="fa fa-times-circle" aria-hidden="true"></i> {this.state.paper.rejections}
           </div>
         </div>
         <div className="row user-vote">
           <div className="col-xs-2">
             Your Review:
           </div>
           <div className="col-xs-2 accept">
             <button type="button" onClick={this.handleAccept} className={acceptButtonClass}>
               {hasAccepted && <i className="fa fa-check" aria-hidden="true"></i>} Accept
               {this.state.acceptPending && <i className="fa fa-circle-o-notch fa-spin"></i>}
             </button>
           </div>
           <div className="col-xs-2 reject">
             <button type="button" onClick={this.handleReject} className={rejectButtonClass}>
               {hasAccepted && <i className="fa fa-times" aria-hidden="true"></i>} Reject
               {this.state.rejectPending && <i className="fa fa-circle-o-notch fa-spin"></i>}
             </button>
           </div>
         </div>
       </div>
     )
   }
 });
