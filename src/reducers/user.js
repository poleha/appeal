import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/User'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/User'
import update from 'react-addons-update'
import { ACTIVATE_USER_FORM, USER_FORM_LOGIN } from '../constants/User'
import { USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL } from '../constants/User'

var newState;

const initialState = {
    logged: false,
    logging: false,
    userName: null,
    userId: null,
    //token: null,
    activeForm: USER_FORM_LOGIN,
    loginErrors: {},
    registerErrors: {},
    network: null,
    externalId: null

};

function cloneState(state) {
    newState = update(state, {
        logging: {$set: false}
    })
    return newState;
}


export default function user(state = initialState, action) {

    switch (action.type) {
        case USER_LOGIN_START:
            state = cloneState(state);
            return state;
        case USER_LOGIN_SUCCESS:
            state = cloneState(state);
            return state;
        case USER_LOGIN_FAIL:
            state = cloneState(state);
            newState = update(state, {
                loginErrors: {$set: action.payload}
            });
            return newState;

        case GET_USER_INFO_START:
            state = cloneState(state);
            newState = update(state, {
                logging: {$set: true}
            });

            return newState;
        case GET_USER_INFO_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                userName: {$set: action.payload.username},
                userId: {$set: action.payload.id},
                logged: {$set: true},
                logging: {$set: false}
            });

            return newState;

        case GET_USER_INFO_FAIL:
            state = cloneState(state);

            newState = update(state, {
                userName: {$set: null},
                userId: {$set: null},
                logged: {$set: true},
                logging: {$set: false}
            });

            return newState;

        case LOGOUT_USER_START:
            state = cloneState(state);
            return state;
        case LOGOUT_USER_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                userName: {$set: null},
                userId: {$set: null},
                activeForm: {$set: USER_FORM_LOGIN}
            });
            return newState;
        case LOGOUT_USER_FAIL:
            state = cloneState(state);
            return state;


        case REGISTER_USER_START:
            state = cloneState(state);
            newState = update(state, {
                registerErrors: {$set: {}}
            });

            return newState;
        case REGISTER_USER_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                registerErrors: {$set: {}}
            });

            return newState;
        case REGISTER_USER_FAIL:
            state = cloneState(state);
            newState = update(state, {
                registerErrors: {$set: action.payload}
            });

            return newState;

        case USER_SOCIAL_LOGIN_START:
            state = cloneState(state);
            return state;
        case USER_SOCIAL_LOGIN_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                externalId: {$set: action.body.id},
                network: {$set: action.body.network}
            });

            return newState;
        case USER_SOCIAL_LOGIN_FAIL:
            state = cloneState(state);
            newState = update(state, {
                externalId: {$set: null},
                network: {$set: null}
            });

            return newState;


        case ACTIVATE_USER_FORM:
            state = cloneState(state);
            newState = update(state, {
                activeForm: {$set: action.payload}
            });
            return newState;

          
        default:
            return state;
    }

}