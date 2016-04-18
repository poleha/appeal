import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
var rating, key;


const initialState = {
  posts: [],
  loading: false,
  loaded: false,
  adding: false,
  added: false,
  rating: {}

};


export default function post(state = initialState, action) {

  switch (action.type) {
    case LOAD_POSTS_START:
      return { ...state, posts:[], loading: true, added: false};
    case LOAD_POSTS_SUCCESS:
      return { ...state, posts:action.payload, loading: false, loaded: true, added: false};
    case LOAD_POSTS_FAIL:
      return { ...state, posts:[], loading: false, added: false};

    case ADD_POST_START:
      return { ...state, adding: true, added: false};
    case ADD_POST_SUCCESS:
        let posts = [action.payload].concat(state.posts);
        return { ...state, posts: posts, adding: false, added: true};
    case ADD_POST_FAIL:
      return { ...state, adding: false, added: false};

    case RATE_POST_START:
        key = action.payload.key;
        rating = {...state.rating};
        rating[key] = true;
      return { ...state, added: false, rating: rating};
    case RATE_POST_SUCCESS:
      key = action.payload.key;
      rating = {...state.rating};
      delete rating[key];
      return { ...state, added: false, rating: rating};
    case RATE_POST_FAIL:
      key = action.payload.key;
      rating = {...state.rating};
      delete rating[key];
      return { ...state, added: false, rating: rating};
    

    default:
      return state;
  }

}