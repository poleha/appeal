import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import PostList from './containers/PostList'
import PostDetail from './containers/PostDetail'
import UserDetail from './containers/UserDetail'

export default (
  <Route path="/" component={App}>
     <IndexRoute component={PostList} />
    <Route path=":tag" component={PostList} />
    <Route path="/post/:id" component={PostDetail} />
     <Route path="/user/:id" component={UserDetail} />
  </Route>
)
