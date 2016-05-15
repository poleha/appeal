import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/User'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/User'
import { ACTIVATE_USER_FORM } from '../constants/User'
import { API_KEY } from '../middleware/api'


import { createCookie, readCookie, eraseCookie} from '../helper'

export function loginUser(userData) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: 'http://127.0.0.1:8000/auth/login/',
                actions: [USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL],
                body: userData
            }
        }
        
        dispatch(action).then((response) => {
            createCookie('appeal_site_token', response.auth_token);
            dispatch(getUserInfo());
        }).catch((error) => {
        });

    }

}


//*************************
export function getUserInfo() {
    return function (dispatch, getState) {


        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: 'http://127.0.0.1:8000/auth/me/',
                actions: [GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL]
            }
        }

        dispatch(action).then((response) => {
            let token = readCookie('appeal_site_token');
            //dispatch(loginUserSuccess(token));
        }).catch((error) => {
            eraseCookie('appeal_site_token');
        });


    }
}

//*************************
export function logoutUser() {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: 'http://127.0.0.1:8000/auth/logout/',
                actions: [LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL]
            }
        }

        dispatch(action).then((response) => {
            eraseCookie('appeal_site_token');
            window.location.hash = '';
        })


    }

}

//***************************************

export function activateForm(formType) {

    return {
        type: ACTIVATE_USER_FORM,
        payload: formType
    }

}

//*************************************
export function registerUser(data) {
    let loginData = {
        username: data.username,
        password: data.password
    };
    return function (dispatch, getState) {
        dispatch(registerUserStart());
        $.ajax({
            type: 'POST',
            data: data,
            url: 'http://127.0.0.1:8000/auth/register/',
            success: function (data) {

                dispatch(registerUserSuccess());
                dispatch(loginUser(loginData));
            },
            error: function (data) {
                dispatch(registerUserFail(data.responseJSON));
            }
        });
    }

}


export function registerUserStart() {

    return {
        type: REGISTER_USER_START
    }

}

export function registerUserSuccess() {

    return {
        type: REGISTER_USER_SUCCESS
    }

}


export function registerUserFail(errors) {

    return {
        type: REGISTER_USER_FAIL,
        payload: errors
    }

}
