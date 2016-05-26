import { combineReducers } from 'redux'
import { routerReducer as routing} from 'react-router-redux'
import user from './user'
import post from './post'
import comment from './comment'
import tag from './tag'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

export default combineReducers({
  reduxAsyncConnect,
  routing,
  tag,
  user,
  post,
  comment
})