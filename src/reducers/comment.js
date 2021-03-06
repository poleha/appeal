import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'
import {UPDATE_COMMENT_START, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL} from '../constants/Comment'
import { LOAD_COMMENT_PERM_START, LOAD_COMMENT_PERM_SUCCESS, LOAD_COMMENT_PERM_FAIL } from '../constants/Comment'
import { CLEAN_COMMENTS } from '../constants/Comment'
import update from 'react-addons-update'

var newState, state, errors;

const initialState = {
    id: null,
    comments: null,
    path: null,
    count: 0,
    loading: false,
    adding: false,
    errors: {},
    added: false
};

function cloneState(state) {
    let newState = update(state, {
        errors: {$set: {}},
        added: {$set: false},
        adding: {$set: false}
    });

    return newState;
}



export default function app(state = initialState, action) {

    switch (action.type) {
        case ADD_COMMENT_START:
            errors = state.errors;
            state = cloneState(state);
            newState = update(state, {
                adding: {$set: true},
                errors: {$set: errors}
            });

            return newState;
        case ADD_COMMENT_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                added: {$set: true},
                comments: {entities: {[action.payload.id]: {$set: action.payload}}, ids: {$unshift: [action.payload.id]}},
                errors: {$set: {}}
            });

            return newState;
        case ADD_COMMENT_FAIL:
            state = cloneState(state);
            newState = update(state, {
                added: {$set: false},
                errors: {$set: action.payload}
            });

            return newState;

        case LOAD_COMMENTS_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });

            return newState;
        case LOAD_COMMENTS_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                loading: {$set: false},
                count: {$set: action.payload.count},
                comments: {$set: {entities: action.payload.entities.comments || {}, ids :action.payload.result}}

            });

            return newState;
        case LOAD_COMMENTS_FAIL:
            state = cloneState(state);
            return state;

        case CLEAN_COMMENTS:
            state = cloneState(state);
            newState = update(state, {
                comments: {$set: null}
            });

            return newState;


        case UPDATE_COMMENT_START:
            errors = state.errors;
            state = cloneState(state);
            newState = update(state, {
                //adding: {$set: true},
                errors: {$set: errors}
            });

            return newState;

        case UPDATE_COMMENT_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                //added: {$set: true},
                comments: {entities: {[action.payload.id]: {$set: action.payload}}, ids: {$set: action.payload.id}},
                errors: {$set: {}}
            });

            return newState;

        case UPDATE_COMMENT_FAIL:
            state = cloneState(state);
            newState = update(state, {
                //added: {$set: false},
                errors: {$set: action.payload}
            });

            return newState;


        case LOAD_COMMENT_PERM_START:
            state = cloneState(state);
            newState = update(state, {
                loading: {$set: true}
            });

            return newState;
        case LOAD_COMMENT_PERM_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                loading: {$set: false},
                count: {$set: action.payload.count},
                comments: {$set: {entities: action.payload.entities.comments || {}, ids :action.payload.result}}

            });

            return newState;
        case LOAD_COMMENT_PERM_FAIL:
            state = cloneState(state);
            newState = update(state, {
                comments: {$set: {entities: {}, ids: []}},
                loading: {$set: true},
                count: {$set: 0}
            });
            return newState;
        

        default:
            return state;
    }




}