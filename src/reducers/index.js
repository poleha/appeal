import { combineReducers } from 'redux'
import post from './post'
import { routerReducer } from 'react-router-redux'



export default combineReducers({
  post,
  routing: routerReducer
})