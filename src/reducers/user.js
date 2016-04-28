import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/User'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/User'

import { ACTIVATE_USER_FORM, USER_FORM_LOGIN } from '../constants/User'


var posts, key;


const initialState = {
    logged: false,
    logging: false,
    userName: null,
    userId: null,
    token: null,
    activeForm: USER_FORM_LOGIN,
    loginErrors: [],
    registerErrors: {}

};

function cloneState(state) {
    let newState = _.cloneDeep(state);
    newState.logging = false;
    return newState;
}


export default function user(state = initialState, action) {

    switch (action.type) {
        case USER_LOGIN_START:
            state = cloneState(state);
            return { ...state, logging: true, token: null};
        case USER_LOGIN_SUCCESS:
            state = cloneState(state);
            return { ...state, logged: true, token: action.payload };
        case USER_LOGIN_FAIL:
            state = cloneState(state);
            return { ...state, token: null, loginErrors: action.payload };

        case GET_USER_INFO_START:
            state = cloneState(state);
            return { ...state };
        case GET_USER_INFO_SUCCESS:
            state = cloneState(state);
            return { ...state, userName: action.payload.username, userId: action.payload.id };
        case GET_USER_INFO_FAIL:
            state = cloneState(state);
            return { ...state, userName: null, userId: null };

        case LOGOUT_USER_START:
            state = cloneState(state);
            return { ...state };
        case LOGOUT_USER_SUCCESS:
            state = cloneState(state);
            return { ...state, userName: null, userId: null, token:null, logged: false, activeForm: USER_FORM_LOGIN };
        case LOGOUT_USER_FAIL:
            state = cloneState(state);
            return { ...state };


        case REGISTER_USER_START:
            state = cloneState(state);
            state.registerErrors = {};
            return state;
        case REGISTER_USER_SUCCESS:
            state = cloneState(state);
            state.registerErrors = {};
            return state;
        case REGISTER_USER_FAIL:
            state = cloneState(state);
            state.registerErrors = action.payload;
            return state;


        case ACTIVATE_USER_FORM:
            state = cloneState(state);
            return { ...state, activeForm: action.payload };

          
        default:
            return state;
    }

}