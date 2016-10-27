import PaperList from './components/PaperList.jsx'
import SiteWideHeaderContainer from '../redux/containers/SiteWideHeaderContainer.jsx'
import PaperCreator from './components/PaperCreator.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ReactDOM from 'react-dom'
import React from 'react'
import '../../sass/main.scss'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import consensusReducers from '../redux/reducers/index.jsx'

let store = createStore(consensusReducers);

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
      <div className="container">
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
        <SiteWideHeaderContainer />
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
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/auth" component={HeadlessPage}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
      </Route>
      <Route path="/" component={Page}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
