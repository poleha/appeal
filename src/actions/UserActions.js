import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/User'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/User'

import { ACTIVATE_USER_FORM } from '../constants/User'


import { createCookie, readCookie, eraseCookie} from '../helper'
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
                dispatch(loginUserFail(data.responseJSON.non_field_errors));
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


export function loginUserFail(errors) {

    return {
        type: USER_LOGIN_FAIL,
        payload: errors
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

//*************************
export function logoutUser() {
    return function (dispatch, getState) {
        dispatch(logoutUserStart());
        let token = readCookie('appeal_site_token');
        $.ajax({
            type: 'POST',
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            url: 'http://127.0.0.1:8000/auth/logout/',
            success: function (data) {
                eraseCookie('appeal_site_token');
                dispatch(logoutUserSuccess());
                dispatch(refreshPosts())
            },
            error: function (data) {
                dispatch(logoutUserFail());
            }
        });
    }

}


export function logoutUserStart() {

    return {
        type: LOGOUT_USER_START
    }

}

export function logoutUserSuccess() {

    return {
        type: LOGOUT_USER_SUCCESS
    }

}


export function logoutUserFail() {

    return {
        type: LOGOUT_USER_FAIL
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
                dispatch(registerUserFail());
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


export function registerUserFail() {

    return {
        type: REGISTER_USER_FAIL
    }

}
