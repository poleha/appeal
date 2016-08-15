import { CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL } from '../constants/Account'
import { CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../constants/Account'
import update from 'react-addons-update'
var newState;

const initialState = {
    errors: {},
    updating: false
};




export default function app(state = initialState, action) {
        switch (action.type) {

        case CHANGE_USERNAME_START:
            newState = update(state, {
                updating: {$set: true}
            });
            return newState;

            case CHANGE_USERNAME_SUCCESS:
            newState = update(state, {
                updating: {$set: false},
                errors: {$set: {}}

            });
            return newState;
        case CHANGE_USERNAME_FAIL:
            newState = update(state, {
                updating: {$set: false},
                errors: {$set: action.payload}
            });
            return newState;


            case CHANGE_PASSWORD_START:
                newState = update(state, {
                    updating: {$set: true}
                });
                return newState;

            case CHANGE_PASSWORD_SUCCESS:
                newState = update(state, {
                    updating: {$set: false},
                    errors: {$set: {}}

                });
                return newState;
            case CHANGE_PASSWORD_FAIL:
                newState = update(state, {
                    updating: {$set: false},
                    errors: {$set: action.payload}
                });
                return newState;



            default:
            return state;
    }




}