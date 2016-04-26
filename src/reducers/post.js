import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Post'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Post'
import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../constants/Post'

var posts, newPosts, post, key;

const initialState = {
    id: null,
    //post: {
    //    comments: [],
    //    tags: []
    //},
    comments: [],

    posts: [],
    count: 0,
    loading: false,
    loaded: false,
    adding: false,
    added: false,
    addPostErrors: {}


};

function cloneState(state) {
    let newState = Object.assign({}, state);
    newState.comments = [];
    state.comments.forEach(function(elem){
        let newObj = Object.assign({}, elem);
        newState.comments.push(newObj);
    });

    newState.posts = [];

    state.posts.forEach(function(elem){
        let newObj = Object.assign({}, elem);
        newObj.tags = newObj.tags.slice(0);
        newState.posts.push(newObj);
    });

    newState.addPostErrors = Object.assign({}, state.addPostErrors);
    newState.added = false;
    newState.loading = false;
    
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case ADD_COMMENT_START:
            state = cloneState(state);
            return state;
        case ADD_COMMENT_SUCCESS:
            state = cloneState(state);
            state.comments = [action.payload].concat(state.comments);
                        
            return state;
        case ADD_COMMENT_FAIL:
            state = cloneState(state);
            return state;

        case LOAD_COMMENTS_START:
            state = cloneState(state);
            return state;
        case LOAD_COMMENTS_SUCCESS:
            state = cloneState(state);
            state.comments = action.payload.results;

            return state;
        case LOAD_COMMENTS_FAIL:
            state = cloneState(state);
            return state;




        case LOAD_POSTS_START:
            state = cloneState(state);
            return state;
        case LOAD_POSTS_SUCCESS:
            state = cloneState(state);
            return { ...state, posts:action.payload.results, loaded: true, count: action.payload.count};
        case LOAD_POSTS_FAIL:
            state = cloneState(state);
            return state;


        case ADD_POST_START:
            state = cloneState(state);
            return { ...state, adding: true, addPostErrors: {}};
        case ADD_POST_SUCCESS:
            state = cloneState(state);
            posts = state.posts;
            post = action.payload;
            post.rated = true;
            newPosts = [post].concat(posts);
            return { ...state, posts: newPosts, adding: false, added: true, count: state.count + 1};
        case ADD_POST_FAIL:
            state = cloneState(state);
            let addPostErrors = action.payload;
            return { ...state, adding: false, addPostErrors: addPostErrors};

        case RATE_POST_START:
            state = cloneState(state);
            key = action.payload.key;
            posts = state.posts;
            posts.findByValue('id', key).rating = true;
            return { ...state, posts: posts};
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
            return { ...state, posts: posts};
        

        default:
            return state;
    }




}