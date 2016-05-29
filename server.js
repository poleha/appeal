const http = require('http');
const express = require('express');
var cookieParser = require('cookie-parser')
//var RedisStore = require('connect-redis')(session);
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './src/helpers/Html';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore'
import routes from './src/routes'


const app = express();


(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();


app.use(cookieParser())

app.use((req, res) => {

  const memoryHistory = createHistory(req.originalUrl);
  const store = configureStore({}, req);
  const history = syncHistoryWithStore(memoryHistory, store);
  let token = req.cookies.appeal_site_token;


  match({ history, routes: routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:',error);
      res.status(500);
      //hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store }).then(() => {
        const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
        );
        res.status(200);
        //console.log(history)
        //res.send(ReactDOM.renderToString(component)
        //res.end()
        global.navigator = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
            ReactDOM.renderToStaticMarkup(<Html component={component} store={store}/>));
      });

    } else {
      res.status(404).send('Not found');
    }

  });


  //res.sendFile(__dirname + '/index.html');
});


const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});







































