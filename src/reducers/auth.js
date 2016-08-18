import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/Auth'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/Auth'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/Auth'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/Auth'
import { USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL } from '../constants/Auth'
import { PASSWORD_RESET_START, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL } from '../constants/Auth'
import update from 'react-addons-update'

var newState;

const initialState = {
    logged: false,
    resettingPassword: false,
    passwordResetDone: true,
    logging: false,
    socialLogging: false,
    userName: null,
    userId: null,
    token: null,
    loginErrors: {},
    registerErrors: {},
    passwordResetErrors: {},
    network: null,
    externalId: null,
    receiveCommentsEmail: null,
    emailConfirmed: null

};

function cloneState(state) {
    newState = update(state, {
        resettingPassword: {$set: false},
        passwordResetDone: {$set: false},
        logging: {$set: false},
        loginErrors: {$set: {}},
        registerErrors: {$set: {}},
        passwordResetErrors: {$set: {}}

    });
    return newState;
}


export default function user(state = initialState, action) {

    switch (action.type) {
        case USER_LOGIN_START:
            state = cloneState(state);
            newState = update(state, {
                logging: {$set: true}
            });

            return newState;
        case USER_LOGIN_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                logging: {$set: false},
                token: {$set: action.payload.auth_token}
            });
            return newState;
        case USER_LOGIN_FAIL:
            state = cloneState(state);
            newState = update(state, {
                loginErrors: {$set: action.payload},
                logging: {$set: false},
                token: {$set: null}
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
                logging: {$set: false},
                token: {$set: action.payload.auth_token},
                receiveCommentsEmail: {$set: action.payload.receive_comments_email},
                emailConfirmed: {$set: action.payload.email_confirmed},

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
            newState = update(state, {
                logging: {$set: true}
            });
            return newState;
        case LOGOUT_USER_SUCCESS:
            state = cloneState(state);

            newState = update(state, {
                userName: {$set: null},
                userId: {$set: null},
                logging: {$set: false},
                token: {$set: null},
                receiveCommentsEmail: {$set: null}

            });
            return newState;
        case LOGOUT_USER_FAIL:
            newState = update(state, {
                logging: {$set: false}
            });
            return newState;


        case REGISTER_USER_START:
            state = cloneState(state);
            newState = update(state, {
                registerErrors: {$set: {}},
                logging: {$set: true}
            });

            return newState;
        case REGISTER_USER_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                registerErrors: {$set: {}},
                logging: {$set: false}
            });

            return newState;
        case REGISTER_USER_FAIL:
            state = cloneState(state);
            newState = update(state, {
                registerErrors: {$set: action.payload},
                logging: {$set: false}
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

        case PASSWORD_RESET_START:
            state = cloneState(state);
            newState = update(state, {
                passwordResetErrors: {$set: {}},
                resettingPassword: {$set: true}
            });

            return newState;

        case PASSWORD_RESET_SUCCESS:
            state = cloneState(state);
            newState = update(state, {
                passwordResetErrors: {$set: {}},
                resettingPassword: {$set: false},
                resettingPasswordDone: {$set: true}
            });

            return newState;

        case PASSWORD_RESET_FAIL:
            state = cloneState(state);
            newState = update(state, {
                passwordResetErrors: {$set: action.payload},
                resettingPassword: {$set: false}
            });

            return newState;
          
        default:
            return state;
    }

}