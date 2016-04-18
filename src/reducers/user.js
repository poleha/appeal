import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
var posts, key;


const initialState = {
    logged: false,
    logging: false,
    userName: null,
    userId: null

};

export default function user(state = initialState, action) {

    switch (action.type) {
        case USER_LOGIN_START:
            return { ...state, logging: true};
        case USER_LOGIN_SUCCESS:
            return { ...state, logging: false, logged: true, userId: action.payload.user_id, userName:action.payload.username};
        case USER_LOGIN_FAIL:
            return { ...state, logging: false};
        default:
            return state;
    }

}