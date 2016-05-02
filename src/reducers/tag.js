import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Tag'

const initialState = {
    loading: false,
    loaded: false,
    tags : null
};

function cloneState(state) {
    let newState = _.cloneDeep(state);
    return newState;
}


export default function app(state = initialState, action) {
        switch (action.type) {

        case LOAD_TAGS_START:
            state = cloneState(state);
            state.loading = true;
            state.tags = {};
            return state;
        case LOAD_TAGS_SUCCESS:
            state = cloneState(state);
            state.tags = action.payload.results;
            state.loading = false;
            state.loaded = true;
            return state;
        case LOAD_TAGS_FAIL:
            state = cloneState(state);
            state.loading = false;
            return state;

        default:
            return state;
    }




}