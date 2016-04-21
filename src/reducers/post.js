import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../constants/Post'
import { LOAD_MORE_POSTS_START, LOAD_MORE_POSTS_SUCCESS, LOAD_MORE_POSTS_FAIL } from '../constants/Post'
import { REFRESH_POSTS_START, REFRESH_POSTS_SUCCESS, REFRESH_POSTS_FAIL } from '../constants/Post'
import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Post'

var posts, key, post, newPosts;

var initialState = {
  posts: [],
  tags : [],
  count: 0,
  loading: false,
  loaded: false,
  adding: false,
  added: false

};


function cloneState(state) {
  let newState = Object.assign({}, state);
  newState.posts = [];
  newState.tags = [];
  state.posts.forEach(function(elem){
    let newObj = Object.assign({}, elem);
    newObj.tags = newObj.tags.slice(0);
    newState.posts.push(newObj);
  });
  state.tags.forEach(function(elem){
    let newObj = Object.assign({}, elem);
    newState.tags.push(newObj);
  });
  newState.added = false;
  newState.loading = false;
  return newState;
}


export default function post(state = initialState, action) {

  switch (action.type) {
    case LOAD_POSTS_START:
      state = cloneState(state);
      return { ...state, posts:[], loading: true};
    case LOAD_POSTS_SUCCESS:
      state = cloneState(state);
      return { ...state, posts:action.payload.results, loaded: true, count: action.payload.count};
    case LOAD_POSTS_FAIL:
      state = cloneState(state);
      return { ...state, posts:[] };

    case LOAD_TAGS_START:
      state = cloneState(state);
      return { ...state, tags:[] };
    case LOAD_TAGS_SUCCESS:
      state = cloneState(state);
      return { ...state, tags:action.payload.results };
    case LOAD_TAGS_FAIL:
      state = cloneState(state);
      return { ...state, tags:[] };


    case ADD_POST_START:
      state = cloneState(state);
      return { ...state, adding: true};
    case ADD_POST_SUCCESS:
      state = cloneState(state);
        posts = state.posts;
        post = action.payload;
        post.rated = true;
        newPosts = [post].concat(posts);
        return { ...state, posts: newPosts, adding: false, added: true, count: state.count + 1};
    case ADD_POST_FAIL:
      state = cloneState(state);
      return { ...state, adding: false };

    case RATE_POST_START:
      state = cloneState(state);
        key = action.payload.key;
        posts = state.posts
        posts.findByValue('id', key).rating = true;
      return { ...state, posts:posts};
    case RATE_POST_SUCCESS:
      state = cloneState(state);
      key = action.payload.key;
      posts = state.posts;
      post = posts.findByValue('id', key);
      post.rated = true;
      post.rating = false;
      if (action.payload.actionType == RATE_POST_TYPE_LIKE) post.liked += 1;
      if (action.payload.actionType == RATE_POST_TYPE_DISLIKE) post.disliked += 1;
      return { ...state, posts:posts};
    case RATE_POST_FAIL:
      state = cloneState(state);
      key = action.payload.key;
      posts = state.posts;
      posts.findByValue('id', key).rating = true;
      return { ...state, posts:posts};

    case LOAD_MORE_POSTS_START:
      state = cloneState(state);
      return { ...state, loading: true };
    case LOAD_MORE_POSTS_SUCCESS:
      state = cloneState(state);
      posts = state.posts;
      newPosts = posts.concat(action.payload.results);
      return { ...state, posts:newPosts, loaded: true, count: action.payload.count};
    case LOAD_MORE_POSTS_FAIL:
      state = cloneState(state);
      return { ...state };


    case REFRESH_POSTS_START:
      state = cloneState(state);
      return { ...state, loading: true };
    case REFRESH_POSTS_SUCCESS:
      state = cloneState(state);
      return { ...state, posts:action.payload.results, loaded: true };
    case REFRESH_POSTS_FAIL:
      state = cloneState(state);
      return { ...state };

    default:
      return state;
  }

}