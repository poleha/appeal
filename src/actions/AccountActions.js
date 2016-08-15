import { CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL } from '../constants/Account'
import { CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../constants/Account'

import { API_KEY } from '../middleware/api'
import { apiHost} from '../helpers/helper'
import { getUserInfo } from '../actions/AuthActions'


const endpoint = apiHost + '/auth/';



export function changeUsername(data) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}username/`,
                actions: [CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL],
                body: data
            }
        }
        
        dispatch(action).then(()=> {
            dispatch(getUserInfo())
        }).catch((error)=>{});

    }

}




export function changePassword(data) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}password/`,
                actions: [CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL],
                body: data
            }
        }

        dispatch(action).catch((error)=>{});

    }

}
