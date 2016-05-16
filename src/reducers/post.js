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
            posts.entities[post.id] = post;
            posts.ids = [post.id].concat(posts.ids);
            state.adding = false;
            state.added = true;
            state.count += 1;
            return state;
        case ADD_POST_FAIL:
            state = cloneState(state);
            let errors = action.payload;
            return { ...state, adding: false, errors: errors};

        case RATE_POST_START:
            state = cloneState(state);
            key = action.body.id;
            posts = state.posts;
            posts.entities[key].rating = true;
            return state;
        case RATE_POST_SUCCESS:
            state = cloneState(state);
            key = action.payload.id;
            posts = state.posts;
            posts.entities[key] = action.payload
            return state;
        case RATE_POST_FAIL:
            state = cloneState(state);
            key = action.body.id;
            posts = state.posts;
            posts.entities[key].rating = false;
            return state;
        

        default:
            return state;
    }




}