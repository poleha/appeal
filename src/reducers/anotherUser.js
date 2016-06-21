import { LOAD_ANOTHER_USERS_START, LOAD_ANOTHER_USERS_SUCCESS, LOAD_ANOTHER_USERS_FAIL } from '../constants/AnotherUser'
import update from 'react-addons-update'
var newState;

const initialState = {
    loading: false,
    loaded: false,
    users : null
};




export default function app(state = initialState, action) {
        switch (action.type) {

        case LOAD_ANOTHER_USERS_START:
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;
            case LOAD_ANOTHER_USERS_SUCCESS:
            newState = update(state, {
                users: {$set: {entities:action.payload.entities.users, ids:action.payload.result}},
                loading: {$set: false},
                loaded: {$set: true}

            });
            return newState;
        case LOAD_ANOTHER_USERS_FAIL:
            newState = update(state, {
                loading: {$set: true}
            });
            return newState;

        default:
            return state;
    }




}