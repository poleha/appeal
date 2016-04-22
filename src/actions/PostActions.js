import { LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../constants/Post'
import { readCookie} from '../helper'



export function loadPost(id) {
    return function (dispatch, getState) {
        dispatch(loadPostStart());

        let token = readCookie('appeal_site_token');
        $.ajax({
            beforeSend: token ? function (xhr) { xhr.setRequestHeader ('Authorization', `Token ${token}`) }: null,
            type: 'GET',
            url: 'http://127.0.0.1:8000/posts/' + id,
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