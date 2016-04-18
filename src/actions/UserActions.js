import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { createCookie, readCookie} from '../helper'

export function loginUser(userData) {
    return function (dispatch, getState) {
        dispatch(loginUserStart());


        $.ajax({
            type: 'POST',
            data: userData,
            url: 'http://127.0.0.1:8000/ajax_login/',
            success: function (data) {
                createCookie('appeal_site_token', data.token_key);
                dispatch(loginUserSuccess(data));
            },
            error: function (data) {
            }
        });
    }

}


export function loginUserStart() {

    return {
        type: USER_LOGIN_START
    }

}

export function loginUserSuccess(userData) {

    return {
        type: USER_LOGIN_SUCCESS,
        payload: userData
    }

}


export function loginUserFail() {

    return {
        type: USER_LOGIN_FAIL
    }

}
