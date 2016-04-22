import { LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../constants/Post'

const initialState = {
    post: {}
    
};

function cloneState(state) {
    let newState = Object.assign({}, state);
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case LOAD_POST_START:
            state = cloneState(state);
            return { ...state, tags:[] };
        case LOAD_POST_SUCCESS:
            state = cloneState(state);
            state.post = action.payloadl;
            return state;
        case LOAD_POST_FAIL:
            state = cloneState(state);
            return state;

        default:
            return state;
    }




}