import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
//*********************************************************

export function loadPosts(params, path) {
    return function (dispatch, getState) {
        let loading = getState().post.loading;
        if (!loading) {
        dispatch(loadPostsStart());
        let urlParams = '';
        if (params) {
            urlParams = jQuery.param( params );
        }

        let token = getState().user.token;
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/?' + urlParams,
            success: function (data) {
                data.path = path;
                dispatch(loadPostsSuccess(data))
            },
            error: function (data) {

                loadPostsFail(data);
            }
        });
    }
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
        let token = getState().user.token;
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


export function ratePost(data) {
    return function (dispatch, getState) {
        dispatch(ratePostStart(data));

        let token = getState().user.token;

        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'PATCH',
            url: `http://127.0.0.1:8000/posts/${data.id}/rate/`,
            data: data,
            success: function (data) {
                dispatch(ratePostSuccess(data))
            },
            error: function (data) {
                dispatch(ratePostFail(data))
            }
        });

    }

}


export function ratePostStart(data) {

    return {
        type: RATE_POST_START,
        payload: data
    }

}

export function ratePostSuccess(data) {

    return {
        type: RATE_POST_SUCCESS,
        payload: data
    }

}


export function ratePostFail(data) {

    return {
        type: RATE_POST_FAIL,
        payload: data
    }

}


//***********************************************

