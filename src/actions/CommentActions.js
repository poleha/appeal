import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'
import { UPDATE_COMMENT_START, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENT_PERM_START, LOAD_COMMENT_PERM_SUCCESS, LOAD_COMMENT_PERM_FAIL } from '../constants/Comment'
import { CLEAN_COMMENTS } from '../constants/Comment'
import { API_KEY } from '../middleware/api'
import { comment } from '../schemas'
import { serializeParams, apiHost } from '../helpers/helper'
import { browserHistory } from 'react-router'

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
        let urlParams = serializeParams(params );
        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: endpoint + '?' + urlParams,
                schema: comment,
                body: params.id ? {id: params.id} : {},
                actions: [LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL]
            }
        }
        return dispatch(action);


    }

}

//*********************************


export function updateComment(comment) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'PATCH',
                endpoint: `${endpoint}${comment.id}/`,
                body: {body: comment.body},
                actions: [UPDATE_COMMENT_START, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL]
            }
        }
        return dispatch(action);
    }

}



//******************************
export function cleanComments() {
    return {
        type: CLEAN_COMMENTS
    }

}


//*************************************

export function loadCommentPerm(id) {
    return function (dispatch, getState) {
        let loading = getState().post.loading;
        if (!loading) {
            let action = {
                [API_KEY]: {
                    method: 'get',
                    endpoint: `${endpoint}${id}/`,
                    schema: comment,
                    actions: [LOAD_COMMENT_PERM_START, LOAD_COMMENT_PERM_SUCCESS, LOAD_COMMENT_PERM_FAIL]
                }
            }
            return dispatch(action).catch(error => {
                //browserHistory.push(`/post/${id}`);
            });
        }
    }
}


