import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'


const initialState = {
    id: null,
    comments: null,
    path: null,
    count: 0,
    loading: false,
    errors: {}


};

function cloneState(state) {
    let newState = _.cloneDeep(state);
    newState.errors = {};

    return newState;
}



export default function app(state = initialState, action) {

    switch (action.type) {
        case ADD_COMMENT_START:
            state = cloneState(state);
            state.adding = true;
            state.errors = {};
            return state;
        case ADD_COMMENT_SUCCESS:
            state = cloneState(state);
            state.added = true;
            state.errors = {};
            state.comments = [action.payload].concat(state.comments);

            return state;
        case ADD_COMMENT_FAIL:
            state = cloneState(state);
            state.errors = action.payload;
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
            return state;

        default:
            return state;
    }




}