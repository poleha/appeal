import { combineReducers } from 'redux'
import { routerReducer as routing} from 'react-router-redux'
import user from './user'
import post from './post'
import comment from './comment'
import tag from './tag'


export default combineReducers({
  routing,
  tag,
  user,
  post,
  comment
})