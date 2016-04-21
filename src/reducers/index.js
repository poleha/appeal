import { combineReducers } from 'redux'
import app from './app'
import post from './post'
import user from './user'



export default combineReducers({
  app,
  post,
  user
})