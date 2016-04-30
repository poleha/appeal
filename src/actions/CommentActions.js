import { ADD_COMMENT_START, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../constants/Comment'
import { LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL } from '../constants/Comment'


export function addComment(data) {
    return function (dispatch, getState) {
        dispatch(addCommentStart());

        let token = getState().user.token;
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'POST',
            data: data,
            url: 'http://127.0.0.1:8000/comments/',
            success: function (data) {

                dispatch(addCommentSuccess(data))
            },
            error: function (data) {
                dispatch(addCommentFail(data.responseJSON))
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


export function addCommentFail(errors) {

    return {
        type: ADD_COMMENT_FAIL,
        payload: errors
    }

}
//***********************************

export function loadComments(params) {

    return function (dispatch, getState) {
        dispatch(loadCommentsStart());
        let urlParams = jQuery.param( params );

        let token = getState().user.token;
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



