import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Post'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Post'
import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'

import { readCookie} from '../helper'




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

export function loadPosts(params) {
    return function (dispatch, getState) {
        dispatch(loadPostsStart());
        let urlParams = '';
        if (params) {
            urlParams = jQuery.param( params );
        }

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/?' + urlParams,
            success: function (data) {
                dispatch(loadPostsSuccess(data))
            },
            error: function (data) {

                loadPostsFail(data);
            }
        });
    }

}


export function loadPostsStart() {

    return {
        type: LOAD_POSTS_START
    }

}

export function loadPostsSuccess(data) {

    return {
        type: LOAD_POSTS_SUCCESS,
        payload: data
    }

}


export function loadPostsFail() {

    return {
        type: LOAD_POSTS_FAIL
    }

}


//**********************
export function addPost(post) {
    return function (dispatch, getState) {
        dispatch(addPostStart());
        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'POST',
            contentType: 'application/json',
            url: 'http://127.0.0.1:8000/posts/',
            data: JSON.stringify(post),
            success: function (data) {
                dispatch(addPostSuccess(data));
            },
            error: function (data) {
                dispatch(addPostFail(data.responseJSON));
            }
        });


    }

}


export function addPostStart() {

    return {
        type: ADD_POST_START
    }

}

export function addPostSuccess(post) {

    return {
        type: ADD_POST_SUCCESS,
        payload: post
    }

}


export function addPostFail(errors) {

    return {
        type: ADD_POST_FAIL,
        payload: errors
    }

}


//**********************


export function ratePost(key, actionType) {
    return function (dispatch, getState) {
        dispatch(ratePostStart(key, actionType));
        let post_mark = {
            post: key,
            mark_type:actionType
        };
        let token = readCookie('appeal_site_token');

        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'POST',
            url: 'http://127.0.0.1:8000/post_marks/',
            data: post_mark,
            success: function (data) {
                dispatch(ratePostSuccess(key, actionType))
            },
            error: function (data) {
            }
        });

    }

}


export function ratePostStart(key, actionType) {

    return {
        type: RATE_POST_START,
        payload: {key, actionType}
    }

}

export function ratePostSuccess(key, actionType) {

    return {
        type: RATE_POST_SUCCESS,
        payload: {key, actionType}
    }

}


export function ratePostFail(key, actionType) {

    return {
        type: RATE_POST_FAIL,
        payload: {key, actionType}
    }

}


//***********************************************

