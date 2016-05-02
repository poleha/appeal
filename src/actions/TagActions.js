import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Tag'



//*********************************

export function loadTags() {
    return function (dispatch, getState) {
        dispatch(loadTagsStart());

        let token = getState().user.token;
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
