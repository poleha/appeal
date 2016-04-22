import { LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../constants/Post'
import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Post'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Post'

const initialState = {
    id: null,
    post: {comments: []},
    comments: []
    
};

function cloneState(state) {
    let newState = Object.assign({}, state);
    newState.post = Object.assign({}, state.post);
    newState.comments = [];
    state.comments.forEach(function(elem){
        let newObj = Object.assign({}, elem);
        newState.comments.push(newObj);
    });
    
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case LOAD_POST_START:
            state = cloneState(state);
            return state;
        case LOAD_POST_SUCCESS:
            state = cloneState(state);
            state.post = action.payload;
            state.id = action.payload.id;
            return state;
        case LOAD_POST_FAIL:
            state = cloneState(state);
            return state;


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

        default:
            return state;
    }




}