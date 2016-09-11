import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { UPDATE_POST_START, UPDATE_POST_SUCCESS, UPDATE_POST_FAIL } from '../constants/Post'
import { LOAD_POSTS_PERM_START, LOAD_POSTS_PERM_SUCCESS, LOAD_POSTS_PERM_FAIL } from '../constants/Post'
import { browserHistory } from 'react-router'
import { CLEAN_POSTS } from '../constants/Post'
import { API_KEY } from '../middleware/api'
import { post } from '../schemas'
import { serializeParams, apiHost} from '../helpers/helper'

const endpoint = apiHost + '/posts/';


export function loadPosts(params) {
    return function (dispatch, getState) {
        let loading = getState().post.loading;
        if (!loading) {
        let urlParams = '';
        if (params) {
            if (params.body == null) {
                delete params.body;
            }
            urlParams = serializeParams(params);
        }

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: endpoint + '?' + urlParams,
                schema: post,
                actions: [LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL]
            },
            path: params.path,
            query: params.body
        }
        return dispatch(action);
    }
    }
}



export function loadPostPerm(id) {
    return function (dispatch, getState) {
        let loading = getState().post.loading;
        if (!loading) {
            let action = {
                [API_KEY]: {
                    method: 'get',
                    endpoint: `${endpoint}${id}/`,
                    schema: post,
                    actions: [LOAD_POSTS_PERM_START, LOAD_POSTS_PERM_SUCCESS, LOAD_POSTS_PERM_FAIL]
                }
            }
            return dispatch(action).catch(error => {
                 //browserHistory.push(`/post/${id}`);
            });
        }
    }
}



//**********************
export function addPost(post) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: endpoint,
                body: post,
                actions: [ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL]
            }
        }
        return dispatch(action).catch(e => {});
           }

}



//**********************


export function updatePost(post) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'PATCH',
                endpoint: `${endpoint}${post.id}/`,
                body: post,
                actions: [UPDATE_POST_START, UPDATE_POST_SUCCESS, UPDATE_POST_FAIL]
            }
        }
        //return dispatch(action).catch(e => {});
        return dispatch(action).then(() => browserHistory.push(`/post/${post.id}`)).catch(e => {});
    }

}



//********************

export function ratePost(data) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'put',
                endpoint: `${endpoint}${data.id}/rate/`,
                body: data,
                actions: [RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL]
            },
            body: data
        };
        return dispatch(action);
    }
}

export function cleanPosts() {
    return function (dispatch, getState) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(dispatch({ type: CLEAN_POSTS }));
            }, 0)
        });
        return promise
    };
}


//***********************************************

