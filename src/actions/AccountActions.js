import { CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL } from '../constants/Account'

import { API_KEY } from '../middleware/api'
import { apiHost} from '../helpers/helper'
import { getUserInfo } from '../actions/AuthActions'


const endpoint = apiHost + '/auth/';



export function changeUsername(userData) {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'post',
                endpoint: `${endpoint}username/`,
                actions: [CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CHANGE_USERNAME_FAIL],
                body: userData
            }
        }
        
        dispatch(action).then(()=> {
            dispatch(getUserInfo())
        }).catch((error)=>{});

    }

}
