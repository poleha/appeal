import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'

var posts, newPosts, post, key;

const initialState = {
    //id: null,
    path: null,
    posts: null,
    count: 0,
    loading: false,
    adding: false,
    added: false,
    errors: {}
};

function cloneState(state) {
    let newState = _.cloneDeep(state);
    newState.added = false;
    newState.adding = false;
    newState.errors = {};

    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case LOAD_POSTS_START:
            state = cloneState(state);
            state.loading = true;
            return state;
        case LOAD_POSTS_SUCCESS:
            state = cloneState(state);
            state.posts = {};
            state.posts.entities = action.payload.entities.posts;
            state.posts.ids = action.payload.result;
            state.count = action.payload.count;
            state.loading = false;
            state.path = action.path;
            return state;
        case LOAD_POSTS_FAIL:
            state = cloneState(state);
            return state;


        case ADD_POST_START:
            state = cloneState(state);
            return { ...state, adding: true, errors: {}};
        case ADD_POST_SUCCESS:
            state = cloneState(state);
            posts = state.posts;
            post = action.payload;
            newPosts = [post].concat(posts);
            return { ...state, posts: newPosts, adding: false, added: true, count: state.count + 1};
        case ADD_POST_FAIL:
            state = cloneState(state);
            let errors = action.payload;
            return { ...state, adding: false, errors: errors};

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