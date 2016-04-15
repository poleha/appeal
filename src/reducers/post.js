import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL } from '../constants/Post'

const initialState = {
  posts: [],
  loading: false,
  loaded: false,
  adding: false

};


export default function post(state = initialState, action) {

  switch (action.type) {
    case LOAD_POSTS_START:
      return { ...state, posts:[], loading: true};
    case LOAD_POSTS_SUCCESS:
      return { ...state, posts:action.payload, loading: false, loaded: true};
    case LOAD_POSTS_FAIL:
      return { ...state, posts:[], loading: false};

    case ADD_POST_START:
      return { ...state, adding: true};
    case ADD_POST_SUCCESS:
        let posts = [action.payload].concat(state.posts);
        return { ...state, posts: posts, adding: false};
    case ADD_POST_FAIL:
      return { ...state, adding: false};

    default:
      return state;
  }

}