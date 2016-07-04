import { combineReducers } from 'redux'
import { routerReducer as routing} from 'react-router-redux'
import auth from './auth'
import post from './post'
import comment from './comment'
import tag from './tag'
import anotherUser from './anotherUser'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  tag,
  auth,
  post,
  comment,
  anotherUser
})