import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL, ADD_POST_START, ADD_POST_SUCCESS, ADD_POST_FAIL } from '../constants/Post'

let testPosts = [
    {id:1, title: 'Test title1', body: 'Test body1', author:'Test author1'},
    {id:2, title: 'Test title2', body: 'Test body1', author:'Test author1'},
    {id:3, title: 'Test title3', body: 'Test body1', author:'Test author1'}
];


export function loadPosts() {
    return function (dispatch, getState) {
     dispatch(loadPostsStart());

     setTimeout(function () {
     dispatch(loadPostsSuccess(testPosts))
     }, 3000)


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

        setTimeout(function () {
            dispatch(addPostSuccess(post))
        }, 1000)


    }

}


export function addPostStart(post) {

    return {
        type: ADD_POST_START
    }

}

export function addPostSuccess(posts) {

    return {
        type: ADD_POST_SUCCESS,
        payload: posts
    }

}


export function addPostFail() {

    return {
        type: ADD_POST_FAIL
    }

}
