import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Tag'
import { API_KEY } from '../middleware/api'
import { tag } from '../schemas'
import { apiHost } from '../helpers/helper'


const endpoint = apiHost + '/tags/';

export function loadTags() {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: endpoint,
                schema: tag,
                actions: [LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL]
            }
        }
        return dispatch(action);

        
    }
}
