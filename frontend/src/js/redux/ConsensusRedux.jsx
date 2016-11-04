import consensusReducers from './reducers/index.jsx';
import Webservice from '../util/Webservice.jsx';
import { createStore } from 'redux';

/**
 * Contains general functionality related to redux as it is used in this app
 */

export default {
  /**
   * Creates the redux store for the app, initializing it appropriately.
   * @return {redux store} Redux store to use in the app
   */
  createStore: function() {
     return createStore(consensusReducers, getInitialState());
  }
}

/**
 * returns the initial state to initialize the redux store with
 * @return {redux state} the initial redux state
 */
function getInitialState() {
  //check if the user is logged in
  if (Webservice.getLoggedInUsername() != null) {
    return { user: { username: Webservice.getLoggedInUsername() } };
  } else {
    return {};
  }
}
