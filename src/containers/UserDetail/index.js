import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Post from '../../components/Post'
import Comment from '../../components/Comment'
import classNames from 'classnames'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import { mapNodes } from '../../helpers/helper'
import NavLink from '../../components/NavLink'

function mapStateToProps(state) {
    return {
        post: state.post,
        comment: state.comment,
        tags: state.tag.tags,
        logged: state.user.logged,
        token: state.user.token,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
   return {
       postActions: bindActionCreators(postActions, dispatch)
   };
}

@asyncConnect([{
    promise: (params, helpers) => {
        let store = params.store;
        let userId = params.params.id;
        let loginPromise;
        if (global.loginPromise) {
            loginPromise = global.loginPromise;
        }
        else {
            loginPromise = Promise.resolve();
        }
        let currentPromise = loginPromise.then(() =>  store.dispatch(postActions.loadPosts({user: userId})));
        let promises = [];
        promises.push(currentPromise);

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class UserDetail extends BaseComponent {

    constructor(props) {
        super(props)
    }


    getPosts() {
        let posts = this.props.post.posts;
        let postsList = mapNodes(posts, (elem) => {
            return (
                <NavLink key={elem.id} activeClassName='active' to={`/post/${elem.id}`}>{elem.body}</NavLink>
            )
        });
     return (
         <ul>
             {postsList}
         </ul>
     )
    }

    render() {
        let userId = this.props.params.id;

      return (

          <div className="user_page">
            <Helmet title='User page'/>

              {this.getPosts.call(this)}
            

        </div>

      )


}

}