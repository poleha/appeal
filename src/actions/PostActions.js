import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'
import { LOAD_MORE_POSTS_START, LOAD_MORE_POSTS_SUCCESS, LOAD_MORE_POSTS_FAIL } from '../constants/Post'
import { REFRESH_POSTS_START, REFRESH_POSTS_SUCCESS, REFRESH_POSTS_FAIL } from '../constants/Post'
import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Post'
import { readCookie} from '../helper'



export function loadPosts() {
    return function (dispatch, getState) {
        dispatch(loadPostsStart());

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/',
            success: function (data) {

                dispatch(loadPostsSuccess(data))
            },
            error: function (data) {
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
                dispatch(addPostSuccess(data))
            },
            error: function (data) {
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


export function addPostFail() {

    return {
        type: ADD_POST_FAIL
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


export function loadMorePosts() {
    return function (dispatch, getState) {
        dispatch(loadMorePostsStart());
        let state = getState();
        let postCount = state.post.posts.length;
        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/?offset=' + postCount,
            success: function (data) {
                dispatch(loadMorePostsSuccess(data))
            },
            error: function (data) {
            }
        });
    }

}


export function loadMorePostsStart() {

    return {
        type: LOAD_MORE_POSTS_START
    }

}

export function loadMorePostsSuccess(data) {

    return {
        type: LOAD_MORE_POSTS_SUCCESS,
        payload: data
    }

}


export function loadMorePostsFail() {

    return {
        type: LOAD_MORE_POSTS_FAIL
    }

}

//***********************************************************


export function refreshPosts() {
    return function (dispatch, getState) {
        dispatch(refreshPostsStart());
        let state = getState();
        let lastId = state.post.posts[state.post.posts.length - 1].id;
        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/?limit=500&id_gte=' + lastId,
            success: function (data) {
                dispatch(refreshPostsSuccess(data))
            },
            error: function (data) {
            }
        });
    }

}


export function refreshPostsStart() {

    return {
        type: REFRESH_POSTS_START
    }

}

export function refreshPostsSuccess(data) {

    return {
        type: REFRESH_POSTS_SUCCESS,
        payload: data
    }

}


export function refreshPostsFail() {

    return {
        type: REFRESH_POSTS_FAIL
    }

}

//*******************************************


export function loadTags() {
    return function (dispatch, getState) {
        dispatch(loadPostsStart());

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/tags/',
            success: function (data) {

                dispatch(loadTagsSuccess(data))
            },
            error: function (data) {
            }
        });
    }

}


export function loadTagsStart() {

    return {
        type: LOAD_TAGS_START
    }

}

export function loadTagsSuccess(data) {

    return {
        type: LOAD_TAGS_SUCCESS,
        payload: data
    }

}


export function loadTagsFail() {

    return {
        type: LOAD_TAGS_FAIL
    }

}
