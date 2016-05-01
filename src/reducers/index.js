import { combineReducers } from 'redux'
import app from './app'
import user from './user'
import post from './post'
import comment from './comment'
import tag from './tag'


export default combineReducers({
  app,
  tag,
  user,
  post,
  comment
})