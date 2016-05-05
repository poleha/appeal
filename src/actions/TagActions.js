import { LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL } from '../constants/Tag'
import { API_KEY } from '../middleware/api'


//*********************************

export function loadTags() {
    return function (dispatch, getState) {

        let action = {
            [API_KEY]: {
                method: 'get',
                endpoint: 'http://127.0.0.1:8000/tags/',
                actions: [LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL]
            }
        }
        return dispatch(action);

        
    }
}
