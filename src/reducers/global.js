import { USER_VK_LOGIN_START, USER_VK_LOGIN_SUCCESS, USER_VK_LOGIN_FAIL } from '../constants/Auth'
import { GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../constants/Auth'
import update from 'react-addons-update'
var newState;

const initialState = {
    menuEnabled: true,
    loginBlockEnabled: true
};




export default function app(state = initialState, action) {
        switch (action.type) {

        case USER_VK_LOGIN_START:
            newState = update(state, {
                menuEnabled: {$set: false},
                loginBlockEnabled: {$set: false}
            });
            return newState;

        case USER_VK_LOGIN_FAIL:
                newState = update(state, {
                    menuEnabled: {$set: true},
                    loginBlockEnabled: {$set: true}
                });
                return newState;
        case GET_USER_INFO_START:
            newState = update(state, {
                menuEnabled: {$set: false},
                loginBlockEnabled: {$set: false}
            });
            return newState;
        case GET_USER_INFO_SUCCESS:
                newState = update(state, {
                    menuEnabled: {$set: true},
                    loginBlockEnabled: {$set: true}
                });
                return newState;
        case GET_USER_INFO_FAIL:
                newState = update(state, {
                    menuEnabled: {$set: true},
                    loginBlockEnabled: {$set: true}
                });
                return newState;

            default:
            return state;
    }




}