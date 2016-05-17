import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Tag'
import update from 'react-addons-update'
var newState;

const initialState = {
    loading: false,
    loaded: false,
    tags : null
};




export default function app(state = initialState, action) {
        switch (action.type) {

        case LOAD_TAGS_START:
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
            case LOAD_TAGS_SUCCESS:
            newState = update(state, {
                tags: {$set: {entities:action.payload.entities.tags, ids:action.payload.result}},
                loading: {$set: false},
                loaded: {$set: true}

            });
            return newState;
        case LOAD_TAGS_FAIL:
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;

        default:
            return state;
    }




}