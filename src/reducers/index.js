import { combineReducers } from 'redux'
import app from './app'
import postList from './postList'
import user from './user'
import post from './post'



export default combineReducers({
  app,
  postList,
  user,
  post
})