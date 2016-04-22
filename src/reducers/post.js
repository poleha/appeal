import { LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../constants/Post'

const initialState = {
    id: null,
    post: {}
    
};

function cloneState(state) {
    let newState = Object.assign({}, state);
    newState.post = Object.assign({}, state.post);
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case LOAD_POST_START:
            state = cloneState(state);
            return { ...state, tags:[] };
        case LOAD_POST_SUCCESS:
            state = cloneState(state);
            state.post = action.payload;
            state.id = action.payload.id;
            return state;
        case LOAD_POST_FAIL:
            state = cloneState(state);
            return state;

        default:
            return state;
    }




}