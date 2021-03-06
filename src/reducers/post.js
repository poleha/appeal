import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import {UPDATE_POST_START, UPDATE_POST_SUCCESS, UPDATE_POST_FAIL} from '../constants/Post'
import { LOAD_POSTS_PERM_START, LOAD_POSTS_PERM_SUCCESS, LOAD_POSTS_PERM_FAIL } from '../constants/Post'
import { CLEAN_POSTS } from '../constants/Post'
import update from 'react-addons-update'
var posts, post, key, newState, errors;

const initialState = {
    path: null,
    posts: null,
    count: 0,
    loading: false,
    adding: false,
    added: false,
    errors: {},
    query: null
};

function cloneState(state) {
    newState = update(state, {
        added: {$set: false},
        adding: {$set: false},
        errors: {$set: {}}
    });

    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case LOAD_POSTS_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
        case LOAD_POSTS_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                posts: {$set: {entities: action.payload.entities.posts || {}, ids: action.payload.result || []}},
                count: {$set: action.payload.count},
                loading: {$set: false},
                path: {$set: action.path},
                query: {$set: action.query}
            });
            return newState;
        case LOAD_POSTS_FAIL:
            state = cloneState(state);
            return state;


        case LOAD_POSTS_PERM_START:
            state = cloneState(state);
            newState = update(state, {
                //posts: {$set: {entities: {}, ids: []}},
                loading: {$set: true}
                //count: {$set: 0}
            });
            return newState;
        case LOAD_POSTS_PERM_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                posts: {$set: {entities: action.payload.entities.posts || {}, ids: action.payload.result || []}},
                count: {$set: action.payload.count},
                loading: {$set: false},
                path: {$set: action.path},
                query: {$set: action.query}
            });
            return newState;
        case LOAD_POSTS_PERM_FAIL:
            state = cloneState(state);
            newState = update(state, {
                posts: {$set: {entities: {}, ids: []}},
                loading: {$set: false},
                count: {$set: 0}
            });
            return newState;
        
        

        case ADD_POST_START:
            errors = state.errors;
            state = cloneState(state);
            newState = update(state, {
                adding: {$set: true},
                errors: {$set: errors}
            });
            return newState;
        case ADD_POST_SUCCESS:
            state = cloneState(state);
            posts = state.posts;
            post = action.payload;

            newState = update(state, {
               posts: {entities: {[post.id]: {$set: post}}, ids: {$unshift: [post.id]}},
               adding: {$set: false},
               added: {$set: true},
               count: {$set: state.count + 1}
            });
            return newState;
        case ADD_POST_FAIL:
            state = cloneState(state);
            newState = update(state, {
               errors: {$set: action.payload},
               adding: {$set: false}
            });
            return newState;

        case RATE_POST_START:
            state = cloneState(state);
            posts = state.posts;
            key = action.body.id;
            posts = state.posts;
            newState = update(state, {
                posts: {entities: {[key]: {rating: {$set: true}}}}
            });

            return newState;
        case RATE_POST_SUCCESS:
            state = cloneState(state);
            key = action.payload.id;
            posts = state.posts;
            
            newState = update(state, {
                posts: {entities: {[key]: {$set: action.payload}}}
            });

            return newState;
        case RATE_POST_FAIL:
            state = cloneState(state);
            key = action.body.id;
            posts = state.posts;
            newState = update(state, {
                posts: {entities: {[key]: {rating: {$set: false}}}}
            });


            return newState;

        case CLEAN_POSTS:
            state = cloneState(state);
            newState = update(state, {
                posts: {$set: {}}
            });


            return newState;



        case UPDATE_POST_START:
            errors = state.errors;
            state = cloneState(state);
            newState = update(state, {
                //adding: {$set: true},
                errors: {$set: errors}
            });
            return newState;

        case UPDATE_POST_SUCCESS:
            state = cloneState(state);
            posts = state.posts;
            post = action.payload;

            newState = update(state, {
                posts: {entities: {[post.id]: {$set: post}}, ids: {$set: post.id}},
                //adding: {$set: false},
                //added: {$set: true},
                //count: {$set: state.count + 1}
            });
            return newState;

        case UPDATE_POST_FAIL:
            state = cloneState(state);
            newState = update(state, {
                errors: {$set: action.payload},
                //adding: {$set: false}
            });
            return newState;



        default:
            return state;
    }




}