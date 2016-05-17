import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'
import update from 'react-addons-update'

var newState, newComment;

const initialState = {
    id: null,
    comments: null,
    path: null,
    count: 0,
    loading: false,
    errors: {}
};

function cloneState(state) {
    let newState = update(state, {
        errors: {$set: {}}
    });

    return newState;
}



export default function app(state = initialState, action) {

    switch (action.type) {
        case ADD_COMMENT_START:
            state = cloneState(state);
            newState = update(state, {
                adding: {$set: true},
                errors: {$set: {}}
            });

            return newState;
        case ADD_COMMENT_SUCCESS:
            state = cloneState(state);

            newComment = Object.create(null);
            newComment[action.payload.id] = action.payload;

            newState = update(state, {
                added: {$set: true},
                comments: {entities: {$merge: newComment}, ids: {$unshift: [action.payload.id]}},
                errors: {$set: {}}
            });

            //state.added = true;
            //state.comments = state.comments || {};
            //state.errors = {};
            //state.comments.entities[action.payload.id] = action.payload;
            //state.comments.ids = [action.payload.id].concat(state.comments.ids);
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
                comments: {$set: {entities: action.payload.entities.comments, ids :action.payload.result}}

            });

            return newState;
        case LOAD_COMMENTS_FAIL:
            state = cloneState(state);
            return state;

        default:
            return state;
    }




}