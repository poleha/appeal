import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import post from './post'



export default combineReducers({
  app,
  user,
  post
})