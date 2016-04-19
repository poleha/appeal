import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../constants/Post'
var posts, key, post;

var initialState = {
  posts: [],
  loading: false,
  loaded: false,
  adding: false,
  added: false

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
        posts = state.posts.slice(0);
        var newPosts = [action.payload].concat(posts)
        return { ...state, posts: newPosts, adding: false, added: true};
    case ADD_POST_FAIL:
      return { ...state, adding: false, added: false};

    case RATE_POST_START:
        key = action.payload.key;
        posts = state.posts.slice(0);
        posts.findByValue('id', key).rating = true;
      return { ...state, added: false, posts:posts};
    case RATE_POST_SUCCESS:
      key = action.payload.key;
      posts = state.posts.slice(0);
      post = posts.findByValue('id', key)
      post.rated = true;
      post.rating = false;
      if (action.payload.actionType == RATE_POST_TYPE_LIKE) post.liked += 1;
      if (action.payload.actionType == RATE_POST_TYPE_DISLIKE) post.disliked += 1;
      return { ...state, added: false, posts:posts};
    case RATE_POST_FAIL:
      key = action.payload.key;
      posts = state.posts.slice(0);
      posts.findByValue('id', key).rating = true;
      return { ...state, added: false, posts:posts};
    

    default:
      return state;
  }

}