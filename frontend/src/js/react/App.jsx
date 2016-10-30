import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx'
import HeadlessPage from './components/structure/HeadlessPage.jsx';
import Page from './components/structure/Page.jsx';
import Home from './components/pages/Home.jsx';
import Paper from './components/pages/Paper.jsx';
import ReactDOM from 'react-dom'
import React from 'react'
import '../../sass/main.scss'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import consensusReducers from '../redux/reducers/index.jsx'

let store = createStore(consensusReducers);

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/auth" component={HeadlessPage}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
      </Route>
      <Route path="/" component={Page}>
        <IndexRoute component={Home} />
        <Route path="paper/:paperId" component={Paper} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
