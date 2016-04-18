import { combineReducers } from 'redux'
import post from './post'
import user from './user'
import { routerReducer } from 'react-router-redux'



export default combineReducers({
  post,
  user,
  routing: routerReducer
})