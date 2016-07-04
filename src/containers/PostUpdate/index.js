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

function mapStateToProps(state) {
    return {
        post: state.post,
        tags: state.tag.tags,
        logged: state.auth.logged,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(postActions, dispatch),
        commentActions: bindActionCreators(commentActions, dispatch)
    };
}

@asyncConnect([{
    promise: (params, helpers) => {
        let store = params.store;
        let id = params.params.id;

        let loginPromise;
        if (global.loginPromise) {
            loginPromise = global.loginPromise;
        }
        else {
            loginPromise = Promise.resolve();
        }
        let promises = [];
        let currentPromise = loginPromise.then(() => {
            return store.dispatch(postActions.loadPosts({id}));
        });
        promises.push(currentPromise);

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostUpdate extends BaseComponent {



    getPost() {
        return this.props.post.posts.entities[this.props.params.id];
    }



    render() {
        let post = this.props.post.posts.entities[this.props.params.id];
        return (
            <div>
             <form className="post_update_form">
                 <div className="form_field">
                 <textarea
                     cols="70"
                     rows="10"
                  defaultValue={post.body}
                  />
                  </div>
              <input
                  type="submit"
                  value="Сохранить"
                  className="btn btn-default"
              />
             </form>
            </div>
        )

    }

}

