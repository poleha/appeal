import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import PostList from './containers/PostList'
import PostDetail from './containers/PostDetail'
import PostUpdate from './containers/PostUpdate'
import CommentUpdate from './containers/CommentUpdate'
import UserDetail from './containers/UserDetail'
import PasswordResetConfirm from './containers/PasswordResetConfirm'
import UserActivate from './containers/UserActivate'
import VkLoginRedirect from './containers/VkLoginRedirect'

export default (
  <Route path='/' component={App}>
     <IndexRoute component={PostList} />
      <Route path='/vk_login_redirect' component={VkLoginRedirect} />
      <Route path=':tag' component={PostList} />
    <Route path='/post/:id' component={PostDetail} />
    <Route path='/post/:id/update' component={PostUpdate} />
      <Route path='/comment/:id/update' component={CommentUpdate} />
     <Route path='/user/:id' component={UserDetail} />
      <Route path='/password/reset/confirm/:uid/:token' component={PasswordResetConfirm} />
      <Route path='/activate/:uid/:token' component={UserActivate} />

  </Route>
)
