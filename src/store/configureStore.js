import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';
import { createApiMiddelware } from '../middleware/api'


export default function configureStore(initialState, req) {
  const logger = createLogger();
  const api = createApiMiddelware(req);
  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk.withExtraArgument(req), api));

  //A store holds the whole state tree of your application.
  //The only way to change the state inside it is to dispatch an action on it.
  //A store is not a class. It’s just an object with a few methods on it.
  //To create it, pass your root reducing function to createStore.
  //http://redux.js.org/docs/api/Store.html

  //Store Methods

//getState()
//dispatch(action)
//subscribe(listener)
//replaceReducer(nextReducer)  Не используется в обычной среде

  if (module.hot) {
    module.hot.accept('../reducers', () => {  //module.hot.accept('../reducers', function () {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}