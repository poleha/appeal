import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import post from './post'
import comment from './comment'


export default combineReducers({
  app,
  user,
  post,
  comment
})