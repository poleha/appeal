import { LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../constants/Post'
import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Post'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Post'

import { readCookie} from '../helper'



export function loadPost(id) {
    return function (dispatch, getState) {
        dispatch(loadPostStart());

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: `http://127.0.0.1:8000/posts/${id}/`,
            success: function (data) {

                dispatch(loadPostSuccess(data))
            },
            error: function (data) {
            }
        });
    }

}


export function loadPostStart() {

    return {
        type: LOAD_POST_START
    }

}

export function loadPostSuccess(data) {

    return {
        type: LOAD_POST_SUCCESS,
        payload: data
    }

}


export function loadPostFail() {

    return {
        type: LOAD_POST_FAIL
    }

}

//*********************************************************


export function addComment(data) {
    return function (dispatch, getState) {
        dispatch(addCommentStart());

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'POST',
            data: data,
            url: 'http://127.0.0.1:8000/comments/',
            success: function (data) {

                dispatch(addCommentSuccess(data))
            },
            error: function (data) {
            }
        });
    }

}


export function addCommentStart() {

    return {
        type: ADD_COMMENT_START
    }

}

export function addCommentSuccess(data) {

    return {
        type: ADD_COMMENT_SUCCESS,
        payload: data
    }

}


export function addCommentFail() {

    return {
        type: ADD_COMMENT_FAIL
    }

}
//***********************************

export function loadComments(params) {
    return function (dispatch, getState) {
        dispatch(loadCommentsStart());
        let urlParams = jQuery.param( params );

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/comments/?' + urlParams,
            success: function (data) {

                dispatch(loadCommentsSuccess(data))
            },
            error: function (data) {
                dispatch(loadCommentsFail(data))
            }
        });
    }

}


export function loadCommentsStart() {

    return {
        type: LOAD_COMMENTS_START
    }

}

export function loadCommentsSuccess(data) {

    return {
        type: LOAD_COMMENTS_SUCCESS,
        payload: data
    }

}


export function loadCommentsFail() {

    return {
        type: LOAD_COMMENTS_FAIL
    }

}


//***********************************

