import PaperList from './components/PaperList.jsx'
import SiteWideHeader from './components/SiteWideHeader.jsx'
import PaperCreator from './components/PaperCreator.jsx'
import Login from './components/Login.jsx'
import ReactDOM from 'react-dom'
import React from 'react'
import '../../sass/main.scss'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'

const HeadlessPage = React.createClass({
  componentWillMount() {
      //invert color on a headless page
      document.body.className = "inverted-page";
  },
  componentWillUnmount() {
      document.body.className = null;
  },
  render() {
    return (
      <div class="container">
        {this.props.children}
      </div>
    )
  }
});

const Page = React.createClass({
  componentWillMount() {
      //restore color on a normal page
      document.body.className = null;
  },
  render() {
    return (
      <div>
        <SiteWideHeader />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

const Home = React.createClass({
  render() {
    return (
      <div>
        <PaperList />
        <PaperCreator />
      </div>
    )
  }
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/auth" component={HeadlessPage}>
      <Route path="login" component={Login} />
    </Route>
    <Route path="/" component={Page}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));
