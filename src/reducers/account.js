import { CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL } from '../constants/Account'
import { CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../constants/Account'
import { PASSWORD_RESET_CONFIRM_START, PASSWORD_RESET_CONFIRM_SUCCESS, PASSWORD_RESET_CONFIRM_FAIL } from '../constants/Account'
import { USER_ACTIVATE_START, USER_ACTIVATE_SUCCESS, USER_ACTIVATE_FAIL } from '../constants/Account'
import { SEND_USER_ACTIVATION_MAIL_START, SEND_USER_ACTIVATION_MAIL_SUCCESS, SEND_USER_ACTIVATION_MAIL_FAIL } from '../constants/Account'

import update from 'react-addons-update'
var newState;

const initialState = {
    errors: {},
    updating: false,
    updated: false
};


function cloneState(state) {
    newState = update(state, {
        errors: {$set: {}},
        updating: {$set: false},
        updated: {$set: false}

    });
    return newState;
}

export default function app(state = initialState, action) {
        switch (action.type) {

        case CHANGE_USERNAME_START:
            newState = cloneState(state);
            newState = update(state, {
                updating: {$set: true},
                updated: {$set: false}
            });
            return newState;

            case CHANGE_USERNAME_SUCCESS:
                newState = cloneState(state);
            newState = update(state, {
                updating: {$set: false},
                errors: {$set: {}},
                updated: {$set: true}

            });
            return newState;
        case CHANGE_USERNAME_FAIL:
            newState = cloneState(state);
            newState = update(state, {
                updating: {$set: false},
                errors: {$set: action.payload},
                updated: {$set: false}
            });
            return newState;


            case CHANGE_PASSWORD_START:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: true},
                    updated: {$set: false}
                });
                return newState;

            case CHANGE_PASSWORD_SUCCESS:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: true},
                    errors: {$set: {}}

                });
                return newState;
            case CHANGE_PASSWORD_FAIL:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: false},
                    errors: {$set: action.payload}
                });
                return newState;


            case PASSWORD_RESET_CONFIRM_START:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: true},
                    updated: {$set: false}
                });
                return newState;

            case PASSWORD_RESET_CONFIRM_SUCCESS:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: true},
                    errors: {$set: {}}

                });
                return newState;
            case PASSWORD_RESET_CONFIRM_FAIL:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: false},
                    errors: {$set: action.payload}
                });
                return newState;

            case USER_ACTIVATE_START:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: true},
                    updated: {$set: false}
                });
                return newState;

            case USER_ACTIVATE_SUCCESS:
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: true},
                    errors: {$set: {}}

                });
                return newState;
            case USER_ACTIVATE_FAIL:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: false},
                    errors: {$set: action.payload}
                });
                return newState;


            case SEND_USER_ACTIVATION_MAIL_START:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: true},
                    updated: {$set: false}
                });
                return newState;

            case SEND_USER_ACTIVATION_MAIL_SUCCESS:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: true},
                    errors: {$set: {}}

                });
                return newState;
            case SEND_USER_ACTIVATION_MAIL_FAIL:
                newState = cloneState(state);
                newState = update(state, {
                    updating: {$set: false},
                    updated: {$set: false},
                    errors: {$set: action.payload}
                });
                return newState;
            
            
            default:
            return state;
    }




}