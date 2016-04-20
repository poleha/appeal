import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { createCookie, readCookie} from '../helper'
import { refreshPosts } from '../actions/PostActions'

export function loginUser(userData) {
    return function (dispatch, getState) {
        dispatch(loginUserStart());


        $.ajax({
            type: 'POST',
            data: userData,
            url: 'http://127.0.0.1:8000/auth/login/',
            success: function (data) {
                createCookie('appeal_site_token', data.auth_token);
                dispatch(loginUserSuccess(data.auth_token));
                dispatch(getUserInfo());
                dispatch(refreshPosts());
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

export function loginUserSuccess(token) {

    return {
        type: USER_LOGIN_SUCCESS,
        payload: token
    }

}


export function loginUserFail() {

    return {
        type: USER_LOGIN_FAIL
    }

}

//*******************************************


export function reLoginUser(userData) {
    return function (dispatch, getState) {

        let token = readCookie('appeal_site_token');
      
        if (token){
         dispatch(loginUserSuccess(token));
         dispatch(getUserInfo());
        }

    }

}

//*************************
export function getUserInfo() {
    return function (dispatch, getState) {
        dispatch(getUserInfoStart());
        let token = readCookie('appeal_site_token');

        $.ajax({
            type: 'GET',
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            url: 'http://127.0.0.1:8000/auth/me/',
            success: function (data) {
                dispatch(getUserInfoSuccess(data));
            },
            error: function (data) {
                dispatch(getUserInfoFail());
            }
        });
    }

}


export function getUserInfoStart() {

    return {
        type: GET_USER_INFO_START
    }

}

export function getUserInfoSuccess(userData) {

    return {
        type: GET_USER_INFO_SUCCESS,
        payload: userData
    }

}


export function getUserInfoFail() {

    return {
        type: GET_USER_INFO_FAIL
    }

}