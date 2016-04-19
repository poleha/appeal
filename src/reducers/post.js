import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../constants/Post'
import { LOAD_MORE_POSTS_START, LOAD_MORE_POSTS_SUCCESS, LOAD_MORE_POSTS_FAIL } from '../constants/Post'
import { REFRESH_POSTS_START, REFRESH_POSTS_SUCCESS, REFRESH_POSTS_FAIL } from '../constants/Post'

var posts, key, post, newPosts;

var initialState = {
  posts: [],
  count: 0,
  loading: false,
  loaded: false,
  adding: false,
  added: false

};


function cloneState(state) {
  let newState = Object.assign({}, state);
  newState.posts = [];
  state.posts.forEach(function(elem){
    let newObj = Object.assign({}, elem);
    newState.posts.push(newObj);
  });
  return newState;
}


export default function post(state = initialState, action) {

  switch (action.type) {
    case LOAD_POSTS_START:
      state = cloneState(state);
      return { ...state, posts:[], loading: true, added: false};
    case LOAD_POSTS_SUCCESS:
      state = cloneState(state);
      return { ...state, posts:action.payload.results, loading: false, loaded: true, added: false, count: action.payload.count};
    case LOAD_POSTS_FAIL:
      state = cloneState(state);
      return { ...state, posts:[], loading: false, added: false};

    case ADD_POST_START:
      state = cloneState(state);
      return { ...state, adding: true, added: false};
    case ADD_POST_SUCCESS:
      state = cloneState(state);
        posts = state.posts;
        newPosts = [action.payload].concat(posts);
        return { ...state, posts: newPosts, adding: false, added: true, count: state.count + 1};
    case ADD_POST_FAIL:
      state = cloneState(state);
      return { ...state, adding: false, added: false};

    case RATE_POST_START:
      state = cloneState(state);
        key = action.payload.key;
        posts = state.posts
        posts.findByValue('id', key).rating = true;
      return { ...state, added: false, posts:posts};
    case RATE_POST_SUCCESS:
      state = cloneState(state);
      key = action.payload.key;
      posts = state.posts;
      post = posts.findByValue('id', key);
      post.rated = true;
      post.rating = false;
      if (action.payload.actionType == RATE_POST_TYPE_LIKE) post.liked += 1;
      if (action.payload.actionType == RATE_POST_TYPE_DISLIKE) post.disliked += 1;
      return { ...state, added: false, posts:posts};
    case RATE_POST_FAIL:
      state = cloneState(state);
      key = action.payload.key;
      posts = state.posts;
      posts.findByValue('id', key).rating = true;
      return { ...state, added: false, posts:posts};

    case LOAD_MORE_POSTS_START:
      state = cloneState(state);
      return { ...state, loading: true, added: false};
    case LOAD_MORE_POSTS_SUCCESS:
      state = cloneState(state);
      posts = state.posts;
      newPosts = posts.concat(action.payload.results);
      return { ...state, posts:newPosts, loading: false, loaded: true, added: false, count: action.payload.count};
    case LOAD_MORE_POSTS_FAIL:
      state = cloneState(state);
      return { ...state, loading: false, added: false};


    case REFRESH_POSTS_START:
      state = cloneState(state);
      return { ...state, loading: true, added: false};
    case REFRESH_POSTS_SUCCESS:
      state = cloneState(state);
      return { ...state, posts:action.payload.results, loading: false, loaded: true, added: false};
    case REFRESH_POSTS_FAIL:
      state = cloneState(state);
      return { ...state, loading: false, added: false};

    default:
      return state;
  }

}