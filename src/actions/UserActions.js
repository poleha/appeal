import { LOAD_ANOTHER_USERS_START, LOAD_ANOTHER_USERS_SUCCESS, LOAD_ANOTHER_USERS_FAIL } from '../constants/User'
import { API_KEY } from '../middleware/api'
import { user } from '../schemas'
import { serializeParams, apiHost} from '../helpers/helper'

const endpoint = apiHost + '/users/';

export function loadUsers(params) {
    return function (dispatch, getState) {
        let urlParams = '';
        if (params) {
            if (params.body == null) {
                delete params.body;
            }
            urlParams = serializeParams(params);
        }

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: endpoint + '?' + urlParams,
                schema: user,
                actions: [LOAD_ANOTHER_USERS_START, LOAD_ANOTHER_USERS_SUCCESS, LOAD_ANOTHER_USERS_FAIL]
            }
        }
        return dispatch(action);

        
    }
}
