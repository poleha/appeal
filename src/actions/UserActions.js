import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/User'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/User'
import { USER_VK_LOGIN_START, USER_VK_LOGIN_SUCCESS, USER_VK_LOGIN_FAIL } from '../constants/User'
import { USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL } from '../constants/User'
import { USER_GOOGLE_LOGIN } from '../constants/User'
import { USER_GOOGLE_LOGOUT } from '../constants/User'
import { ACTIVATE_USER_FORM } from '../constants/User'
import { API_KEY } from '../middleware/api'
import { history } from  '../index'


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
            //let token = readCookie('appeal_site_token');
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
        }).then(() => {
            if (getState().user.network == 'google') {
                var auth2 = gapi.auth2.getAuthInstance();
                return auth2.signOut()
            }
        }).then(() => {
            history.push('');
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
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: 'http://127.0.0.1:8000/auth/register/',
                actions: [REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL],
                body: data
            }
        }

        dispatch(action).then(response => {
            dispatch(loginUser(loginData));
        }).then(() => history.push(''));

    }
}


export function VKLogin() {
    return function (dispatch, getState) {
        dispatch({type: USER_VK_LOGIN_START});

        VK.Auth.login((r) => {
            if (r.session) {
                let user = r.session.user;
                let username = user.nickname || user.first_name;
                let id = user.id;
                let body = {
                    username,
                    id,
                    network: 'vk'
                };


                let action = {
                    [API_KEY]: {
                        method: 'post',
                        endpoint: 'http://127.0.0.1:8000/social_login/',
                        body: body,
                        actions: [USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL]
                    },
                    body: body
                };

                dispatch(action).then(response => {
                    createCookie('appeal_site_token', response.auth_token);
                    dispatch(getUserInfo());
                    }).then(response => {
                    dispatch({
                        type: USER_VK_LOGIN_SUCCESS
                })

                }).then(() => history.push(''));


            } else {
                dispatch({
                    type: USER_VK_LOGIN_FAIL,
                    error: true,
                    payload: new Error('Ошибка авторизации')
                })
            }
        },4, 4194304); // запрос прав на доступ к photo и email


    }
}

export function GoogleLogin(data) {
    return function (dispatch, getState) {


        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: 'http://127.0.0.1:8000/social_login/',
                body: data,
                actions: [USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL]
            },
            body: data
        };

        dispatch(action).then(response => {
            createCookie('appeal_site_token', response.auth_token);
            dispatch(getUserInfo());
        }).then(() => history.push(''));


    }


}