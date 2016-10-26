/*
Combines all the reducers. Will be more useful if reducers are split
across multiple files.
*/

import { combineReducers } from 'redux'
import user from './user.jsx'

const consensusReducers = combineReducers({
  user
})

export default consensusReducers
