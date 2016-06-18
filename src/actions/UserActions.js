import { USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/User'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/User'
import { LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL } from '../constants/User'
import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/User'
import { USER_VK_LOGIN_START, USER_VK_LOGIN_SUCCESS, USER_VK_LOGIN_FAIL } from '../constants/User'
import { USER_FACEBOOK_LOGIN_START, USER_FACEBOOK_LOGIN_SUCCESS, USER_FACEBOOK_LOGIN_FAIL } from '../constants/User'
import { USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL } from '../constants/User'
import { USER_GOOGLE_LOGIN_START, USER_GOOGLE_LOGIN_SUCCESS, USER_GOOGLE_LOGIN_FAIL } from '../constants/User'
import { API_KEY } from '../middleware/api'
import { createCookie, eraseCookie, readCookie, apiHost} from '../helpers/helper'

const endpoint = apiHost + '/auth/';



export function loginUser(userData) {
    return function (dispatch, getState, req) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}login/`,
                actions: [USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL],
                body: userData
            }
        }
        
        dispatch(action).then((response) => {
            createCookie('appeal_site_token', response.auth_token, req);
            dispatch(getUserInfo());
        }).catch((error) => {
        });

    }

}


//*************************
export function getUserInfo() {
    return function (dispatch, getState, req) {


        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: `${endpoint}me/`,
                actions: [GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
                token: readCookie('appeal_site_token', req)
            }
        }

        dispatch(action).then((response) => {
        }).catch((error) => {
            eraseCookie('appeal_site_token', req);
        });


    }
}

//*************************
export function logoutUser() {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}logout/`,
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
        })


    }

}

//***************************************

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
                endpoint: `${endpoint}register/`,
                actions: [REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL],
                body: data
            }
        }

        dispatch(action).then(response => {
            dispatch(loginUser(loginData));
        }).catch((error) => {
        });

    }
}


export function VKLogin() {
    return function (dispatch, getState, req) {
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
                        endpoint: `${endpoint}social_login/`,
                        body: body,
                        actions: [USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL]
                    },
                    body: body
                };

                dispatch(action).then(response => {
                    createCookie('appeal_site_token', response.auth_token, req);
                    dispatch(getUserInfo());
                    }).then(response => {
                    dispatch({
                        type: USER_VK_LOGIN_SUCCESS
                })

                });


            } else {
                dispatch({
                    type: USER_VK_LOGIN_FAIL
                })
            }
        },4, 4194304); // запрос прав на доступ к photo и email


    }
}

export function GoogleLogin(data) {
    return function (dispatch, getState, req) {
        dispatch({type: USER_GOOGLE_LOGIN_START});

        let prom = window.auth2.signIn()
            prom.then((googleUser) => {
            let profile = googleUser.getBasicProfile();
            let data = {
                id: profile.getId(),
                username: profile.getName(),
                network: 'google'
            };
            let action = {
                [API_KEY]: {
                    method: 'post',
                    endpoint: `${endpoint}social_login/`,
                    body: data,
                    actions: [USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL]
                },
                body: data
            };
            return dispatch(action);

        }).then(response => {
            createCookie('appeal_site_token', response.auth_token, req);
            return dispatch(getUserInfo());
        }).then(() => {
            dispatch({type: USER_GOOGLE_LOGIN_SUCCESS})
        })
            }






}


export function FacebookLogin() {
    return function (dispatch, getState, req) {
        dispatch({type: USER_FACEBOOK_LOGIN_START});
        
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(response) {


                    let body = {
                        username: response.name,
                        id: response.id,
                        network: 'facebook'
                    };

                    let action = {
                        [API_KEY]: {
                            method: 'post',
                            endpoint: `${endpoint}social_login/`,
                            body: body,
                            actions: [USER_SOCIAL_LOGIN_START, USER_SOCIAL_LOGIN_SUCCESS, USER_SOCIAL_LOGIN_FAIL]
                        },
                        body: body
                    };

                    dispatch(action).then(response => {
                        createCookie('appeal_site_token', response.auth_token, req);
                        dispatch(getUserInfo());
                    }).then(response => {
                        dispatch({
                            type: USER_FACEBOOK_LOGIN_SUCCESS
                        })

                    });


                });
            } else {
                dispatch({type: USER_FACEBOOK_LOGIN_FAIL});
            }
        });

    }
}