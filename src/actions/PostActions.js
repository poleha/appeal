import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { API_KEY } from '../middleware/api'
import { post } from '../schemas'
import { serializeParams} from '../helper'


export function loadPosts(params, path) {
    return function (dispatch, getState) {
        let loading = getState().post.loading;
        if (!loading) {
        let urlParams = '';
        if (params) {
            urlParams = serializeParams(params);
        }

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: 'http://127.0.0.1:8000/posts/?' + urlParams,
                schema: post,
                actions: [LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL]
            },
            path: path
        }
        return dispatch(action);
    }
    }
}



//**********************
export function addPost(post) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: 'http://127.0.0.1:8000/posts/',
                body: post,
                actions: [ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL]
            }
        }
        return dispatch(action).catch(e => {});
           }

}



//**********************


export function ratePost(data) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'put',
                endpoint: `http://127.0.0.1:8000/posts/${data.id}/rate/`,
                body: data,
                actions: [RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL]
            },
            body: data
        };
        return dispatch(action);
    }
}




//***********************************************

