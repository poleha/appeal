import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'
import { CLEAN_COMMENTS } from '../constants/Comment'
import { API_KEY } from '../middleware/api'
import { comment } from '../schemas'
import { serializeParams, apiHost } from '../helpers/helper'

const endpoint = apiHost + '/comments/';

export function addComment(data) {
    return function (dispatch, getState) {
        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: endpoint,
                body: data,
                actions: [ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL]
            }
        }
        return dispatch(action).catch(e => {});
    }
}


//***********************************

export function loadComments(params) {

    return function (dispatch, getState) {
        let urlParams = serializeParams( params );
        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: endpoint + '?' + urlParams,
                schema: comment,
                actions: [LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL]
            }
        }
        return dispatch(action);


    }

}



export function cleanComments() {
    return {
        type: CLEAN_COMMENTS
    }

}


