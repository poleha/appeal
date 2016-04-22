import { CHANGE_PATH } from '../constants/App'
import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/App'

const initialState = {
    path: '',
    componentName: null,
    tags : []
};

function cloneState(state) {
    let newState = Object.assign({}, state);
    newState.tags = [];

    state.tags.forEach(function(elem){
        let newObj = Object.assign({}, elem);
        newState.tags.push(newObj);
    });
    
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case CHANGE_PATH:
            state = cloneState(state);
            state.path = action.payload.path;
            state.componentName = action.payload.componentName;
            return state;

        case LOAD_TAGS_START:
            state = cloneState(state);
            return { ...state, tags:[] };
        case LOAD_TAGS_SUCCESS:
            state = cloneState(state);
            return { ...state, tags:action.payload.results };
        case LOAD_TAGS_FAIL:
            state = cloneState(state);
            return { ...state, tags:[] };
        
        
        
        default:
            return state;
    }

    
    
    
}