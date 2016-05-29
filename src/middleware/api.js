import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import {readCookie} from '../helper'


export const API_KEY = Symbol('Api');

function fetchApi(endpoint, method, headers, body, schema) {
    let options = {method, headers};
    if (['get', 'head'].indexOf(method) < 0) {
        options.body = JSON.stringify(body);
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    return fetch(endpoint, options).then(response => response.json().then((json) => {
        if (response.ok) {
            if (schema) return Object.assign(json, normalize(json.results, arrayOf(schema)));
            else return json;
        }
        else return Promise.reject(json);
    })).catch(error => {
        if( error.__proto__.constructor === SyntaxError ) return null;
        else return Promise.reject(error)
    })
}


function createAction(action, actionType){
    return Object.assign({}, action, {type: actionType});
}
export function createApiMiddelware(req) {
    
    return  store => dispatch => action => {
        if (action[API_KEY]) {
            let apiAction = action[API_KEY];
            let [actionStart, actionSuccess, actionFail] = apiAction.actions;
            let endpoint = apiAction.endpoint;
            let method = apiAction.method;
            let schema = apiAction.schema || null;
            let body = apiAction.body;
            let token = readCookie('appeal_site_token', req);
            let headers = {};
            if (token) {
                headers.Authorization = `Token ${token}`;
            }
            delete action[API_KEY];
            actionStart = createAction(action, actionStart);
            actionSuccess = createAction(action, actionSuccess);
            actionFail = createAction(action, actionFail);

            dispatch(actionStart);
            return fetchApi(endpoint, method, headers, body, schema).then(response => {
                    actionSuccess.payload = response;
                    dispatch(actionSuccess);
                    return Promise.resolve(response);
                },
            ).catch(error => {
                actionFail.payload = error;
                dispatch(actionFail);

            })
        }
        else return dispatch(action);


    };


}
