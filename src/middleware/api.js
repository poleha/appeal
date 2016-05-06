import 'isomorphic-fetch'

export const API_KEY = Symbol('Api');

function fetchApi(endpoint, method, headers, body) {
    let options = {method, headers};
    if (['get', 'head'].indexOf(method) < 0) {
        options.body = JSON.stringify(body);
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    return fetch(endpoint, options).then(response => response.json().then((json) => {
        if (response.ok) return json;
        else return Promise.reject(json);
    }))

}


function createAction(action, actionType){
    return Object.assign({}, action, {type: actionType});
}

export const api = store => dispatch => action => {
    if (action[API_KEY]) {
    let apiAction = action[API_KEY];
    let [actionStart, actionSuccess, actionFail] = apiAction.actions;
    let endpoint = apiAction.endpoint;
    let method = apiAction.method;
    let body = apiAction.body;
    let token = store.getState().token;
    let headers = {};
        if (token) {
        headers.Authorization = `Token ${token}`;
    }
    delete action[API_KEY];
    actionStart = createAction(action, actionStart);
    actionSuccess = createAction(action, actionSuccess);
    actionFail = createAction(action, actionFail);


        dispatch(actionStart);
        fetchApi(endpoint, method, headers, body).then(response => {
            actionSuccess.payload = response;
            dispatch(actionSuccess);
        },
        ).catch(error => {
            actionFail.payload = error;
            dispatch(actionFail);
            
        })
    }
    else return dispatch(action);


};
