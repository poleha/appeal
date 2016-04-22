import { combineReducers } from 'redux'
import app from './app'
import postList from './postList'
import user from './user'



export default combineReducers({
  app,
  postList,
  user
})