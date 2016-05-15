import 'isomorphic-fetch'
import {readCookie} from '../helper'

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
    })).catch(error => {
        if( error.__proto__.constructor === SyntaxError ) return null;
        else return Promise.reject(error)
    })

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
    let token = readCookie('appeal_site_token');
    let headers = {};
        if (token) {
        headers.Authorization = `Token ${token}`;
    }
    delete action[API_KEY];
    actionStart = createAction(action, actionStart);
    actionSuccess = createAction(action, actionSuccess);
    actionFail = createAction(action, actionFail);


        dispatch(actionStart);
        return fetchApi(endpoint, method, headers, body).then(response => {
            actionSuccess.payload = response;
            dispatch(actionSuccess);
            return Promise.resolve(response);
        },
        ).catch(error => {
            actionFail.payload = error;
            dispatch(actionFail);
            return Promise.reject(error);

        })
    }
    else return dispatch(action);


};
