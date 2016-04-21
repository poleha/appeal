import { CHANGE_PATH } from '../constants/App'




export function changePath(path) {

    return {
        type: CHANGE_PATH,
        payload: path
    }

}
