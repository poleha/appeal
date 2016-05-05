import { CHANGE_PATH } from '../constants/App'




export function changePathStart(path) {
    return function (dispatch, getState) {
    
    let pathData = {};
    if (path.indexOf('/') < 0){
        pathData.componentName = 'PostList';
    }
    else {
        pathData.componentName = 'PostDetail';
    }
    pathData.path = path;
    dispatch(changePath(pathData));

        
    }
    
}


export function changePath(pathData) {


    return {
        type: CHANGE_PATH,
        payload: pathData
    }

}
