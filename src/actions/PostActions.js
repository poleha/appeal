import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL, RATE_POST_START, RATE_POST_SUCCESS, RATE_POST_FAIL } from '../constants/Post'

let testPosts = {
    1: {id: 1, title: 'Test title1', body: 'Test body1', username: 'Test username1', rated: false, liked: 0, disliked: 0},
    2: {id: 2, title: 'Test title2', body: 'Test body2', username: 'Test username2', rated: false, liked: 0, disliked: 0},
    3: {id: 3, title: 'Test title3', body: 'Test body3', username: 'Test username3', rated: false, liked: 0, disliked: 0}
};


export function loadPosts() {
    return function (dispatch, getState) {
        dispatch(loadPostsStart());


        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/',
            success: function (data) {
                let posts = {};
                 data.forEach(function (elem) {
                     posts[elem.id] = elem;
                 });

                dispatch(loadPostsSuccess(posts))
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

export function loadPostsSuccess(posts) {

    return {
        type: LOAD_POSTS_SUCCESS,
        payload: posts
    }

}


export function loadPostsFail() {

    return {
        type: ADD_POST_START
    }

}


//**********************
export function addPost(post) {
    return function (dispatch, getState) {
        dispatch(addPostStart());

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/posts/',
            data: post,
            success: function (data) {
                dispatch(addPostSuccess(post))
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
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/post_marks/',
            data: post_mark,
            success: function (data) {
                dispatch(ratePostSuccess(key, actionType))
            },
            error: function (data) {
            }
        });


        //setTimeout(function () {
        //    dispatch(ratePostSuccess(key, actionType))
        //}, 3000)


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
