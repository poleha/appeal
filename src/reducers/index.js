import { combineReducers } from 'redux'
import { routerReducer as routing} from 'react-router-redux'
import auth from './auth'
import post from './post'
import comment from './comment'
import tag from './tag'
import user from './user'
import account from './account'
import global from './global'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  tag,
  auth,
  post,
  comment,
  user,
  account,
  global
})