import { CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL } from '../constants/Account'
import { CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../constants/Account'
import { SAVE_PROFILE_START, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAIL } from '../constants/Account'
import { PASSWORD_RESET_CONFIRM_START, PASSWORD_RESET_CONFIRM_SUCCESS, PASSWORD_RESET_CONFIRM_FAIL } from '../constants/Account'
import { USER_ACTIVATE_START, USER_ACTIVATE_SUCCESS, USER_ACTIVATE_FAIL } from '../constants/Account'
import { SEND_USER_ACTIVATION_MAIL_START, SEND_USER_ACTIVATION_MAIL_SUCCESS, SEND_USER_ACTIVATION_MAIL_FAIL } from '../constants/Account'
import { SET_USER_EMAIL_START, SET_USER_EMAIL_SUCCESS, SET_USER_EMAIL_FAIL } from '../constants/Account'

import { API_KEY } from '../middleware/api'
import { apiHost} from '../helpers/helper'
import { getUserInfo } from '../actions/AuthActions'


let endpoint = apiHost + '/auth/';



export function changeUsername(data) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}username/`,
                actions: [CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL],
                body: data
            }
        }
        
        dispatch(action).then(()=> {
            dispatch(getUserInfo())
        }).catch((error)=>{});

    }

}




export function changePassword(data) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}password/`,
                actions: [CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL],
                body: data
            }
        }

        dispatch(action).catch((error)=>{});

    }

}


export function saveProfile(data) {
    return function (dispatch, getState) {
        endpoint = apiHost;
        let userId = data.userId;
        delete data.userId;
        let action = {
            [API_KEY]: {
                method: 'PATCH',
                endpoint: `${endpoint}/user_profile/${userId}/`,
                actions: [SAVE_PROFILE_START, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAIL],
                body: data
            }
        }

        dispatch(action).then(()=> {
            dispatch(getUserInfo())
        }).catch((error)=>{});

    }

}


export function passwordResetConfirm(data) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}password/reset/confirm/`,
                actions: [PASSWORD_RESET_CONFIRM_START, PASSWORD_RESET_CONFIRM_SUCCESS, PASSWORD_RESET_CONFIRM_FAIL],
                body: data
            }
        }

        dispatch(action).catch((error)=>{});

    }

}

export function userActivate(data) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}activate/`,
                actions: [USER_ACTIVATE_START, USER_ACTIVATE_SUCCESS, USER_ACTIVATE_FAIL],
                body: data
            }
        }

        dispatch(action).catch((error)=>{});

    }

}

export function sendUserActivationMail() {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${apiHost}/send_user_activation_email/`,
                actions: [SEND_USER_ACTIVATION_MAIL_START, SEND_USER_ACTIVATION_MAIL_SUCCESS, SEND_USER_ACTIVATION_MAIL_FAIL],
            }
        }

        dispatch(action).catch((error)=>{});

    }

}


export function setUserEmail(body) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}set_email/`,
                body: body,
                actions: [SET_USER_EMAIL_START, SET_USER_EMAIL_SUCCESS, SET_USER_EMAIL_FAIL],
            }
        }

        dispatch(action).then(()=> {
            dispatch(getUserInfo())
        }).catch((error)=>{});


    }

}