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
    addPostErrors: {},
    addCommentErrors: {}


};

function cloneState(state) {
    let newState = _.cloneDeep(state);
    newState.added = false;
    newState.adding = false;
    newState.loading = false;

    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case ADD_COMMENT_START:
            state = cloneState(state);
            state.adding = true;
            state.addCommentErrors = {};
            return state;
        case ADD_COMMENT_SUCCESS:
            state = cloneState(state);
            state.added = true;
            state.addCommentErrors = {};
            state.comments = [action.payload].concat(state.comments);
                        
            return state;
        case ADD_COMMENT_FAIL:
            state = cloneState(state);
            state.addCommentErrors = action.payload;
            return state;

        case LOAD_COMMENTS_START:
            state = cloneState(state);
            state.loading = true;
            return state;
        case LOAD_COMMENTS_SUCCESS:
            state = cloneState(state);
            state.loading = false;
            state.comments = action.payload.results;

            return state;
        case LOAD_COMMENTS_FAIL:
            state = cloneState(state);
            state.loading = false;
            return state;



        case LOAD_POSTS_START:
            state = cloneState(state);
            state.loading = true;
            return state;
        case LOAD_POSTS_SUCCESS:
            state = cloneState(state);
            return { ...state, posts:action.payload.results, loaded: true, count: action.payload.count};
        case LOAD_POSTS_FAIL:
            state = cloneState(state);
            state.loading = false;
            return state;


        case ADD_POST_START:
            state = cloneState(state);
            return { ...state, adding: true, addPostErrors: {}};
        case ADD_POST_SUCCESS:
            state = cloneState(state);
            posts = state.posts;
            post = action.payload;
            newPosts = [post].concat(posts);
            return { ...state, posts: newPosts, adding: false, added: true, count: state.count + 1};
        case ADD_POST_FAIL:
            state = cloneState(state);
            let addPostErrors = action.payload;
            return { ...state, adding: false, addPostErrors: addPostErrors};

        case RATE_POST_START:
            state = cloneState(state);
            key = action.payload.id;
            posts = state.posts;
            posts.findByValue('id', key).rating = true;
            return { ...state, posts: posts};
        case RATE_POST_SUCCESS:
            state = cloneState(state);
            key = action.payload.id;
            posts = state.posts;
            let index = posts.getIndexByValue('id', key);
            posts[index] = action.payload;

            return { ...state, posts:posts};
        case RATE_POST_FAIL:
            state = cloneState(state);
            key = action.payload.id;
            posts = state.posts;
            posts.findByValue('id', key).rating = false;
            return { ...state, posts: posts};
        

        default:
            return state;
    }




}