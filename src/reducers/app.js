import { CHANGE_PATH } from '../constants/App'


const initialState = {
    path: '',
    componentName: null
};

function cloneState(state) {
    let newState = _.cloneDeep(state);
    return newState;
}


export default function app(state = initialState, action) {

    switch (action.type) {
        case CHANGE_PATH:
            state = cloneState(state);
            state.path = action.payload.path;
            state.componentName = action.payload.componentName;
            return state;

       
        
        
        default:
            return state;
    }

    
    
    
}