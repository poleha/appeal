import { CHANGE_PATH } from '../constants/App'

const initialState = {
    path: ''
};

function cloneState(state) {
    let newState = Object.assign({}, state);
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case CHANGE_PATH:
            state = cloneState(state);
            state.path = action.payload;
            return state;

        default:
            return state;
    }

}