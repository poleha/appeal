import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'
import { API_KEY } from '../middleware/api'
import { comment } from '../schemas'


export function addComment(data) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: 'http://127.0.0.1:8000/comments/',
                body: data,
                actions: [ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL]
            }
        }
        return dispatch(action);
    }
}


//***********************************

export function loadComments(params) {

    return function (dispatch, getState) {
        let urlParams = jQuery.param( params );
        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: 'http://127.0.0.1:8000/comments/?' + urlParams,
                schema: comment,
                actions: [LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL]
            }
        }
        return dispatch(action);


    }

}




