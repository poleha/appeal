import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import ReactDOM from 'react-dom'
import Post from '../../components/Post'
import Comment from '../../components/Comment'
import classNames from 'classnames'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import { mapNodes } from '../../helper'

function mapStateToProps(state) {
    return {
        post: state.post,
        comment: state.comment,
        tags: state.tag.tags,
        logged: state.user.logged,
        token: state.user.token,
        userId: state.user.userId
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
        let store = params.store
        let id = params.params.id
        let promises = []
        promises.push(store.dispatch(postActions.loadPosts({id}, id)))
        promises.push(store.dispatch(commentActions.loadComments({post: id})))

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostDetail extends BaseComponent {

    getPost() {
        return this.props.post.posts[this.props.params.id];
    }

  
    componentDidUpdate() {
        if (this.props.comment.added) {

            ReactDOM.findDOMNode(this._add_comment_username).value = '';
            ReactDOM.findDOMNode(this._add_comment_email).value = '';
            ReactDOM.findDOMNode(this._add_comment_body).value = '';
        }
    }

    addCommentFormSubmit(e) {
        e.preventDefault();
        let username = ReactDOM.findDOMNode(this._add_comment_username).value;
        let email = ReactDOM.findDOMNode(this._add_comment_email).value;
        let body = ReactDOM.findDOMNode(this._add_comment_body).value;

        let comment = { username, body, email, post: this.props.params.id };
        this.props.commentActions.addComment(comment);
    }

    loadMoreCommentsClick(e) {

        this.props.commentActions.loadComments({post: this.props.params.id, limit: this.props.comment.comments.ids.length + 10} )

    }

    refreshCommentsClick(e) {
        this.props.postActions.loadPosts({id: this.props.params.id}, this.props.params.id);
        this.props.commentActions.loadComments({post: this.props.params.id} )

    }

    getAddCommentForm() {
        if (this.props.comment.adding) return null;
        let usernameInputClass = classNames('form_field',
        {
            hidden: this.props.userId
        });
        
        let emailImputClass = classNames('form_field',
            {
                hidden: this.props.userId
            });
        return (
            <div key="add_comment_form_key">
            <form
                onSubmit={this.addCommentFormSubmit.bind(this)}
                className="add_comment_form"
            >
                <div className={usernameInputClass}>
                {this.getFieldErrors.call(this, 'username', 'comment')}
                <input
                    ref={(c) => this._add_comment_username = c}
                    placeholder="Автор"
                    type="text"
                />
                </div>
                <div className={emailImputClass}>
                {this.getFieldErrors.call(this, 'email', 'comment')}
                <input
                    ref={(c) => this._add_comment_email = c}
                    placeholder="E-mail"
                    type="text"
                />
                    </div>
                <div className="form_field">
                {this.getFieldErrors.call(this, 'body', 'comment')}
            <textarea cols="70" rows="10"
                      ref={(c) => this._add_comment_body = c}
                      className='add_comment_body'
                      placeholder="Комментарий"
            />
                    </div>

                <input
                    type="submit"
                    className="btn btn-default"
                    value="Добавить"
                />
            </form>
        {this.getAddedBlock.call(this)}
         </div>

        )
    }

    getAddedBlock() {
        if (this.props.comment.added) {
            return <div className="added_message">
                Ваш комментарий добавлен
            </div>
        }
    }

    render() {
       let post = this.props.post.posts.entities[this.props.params.id];
      let comments = this.props.comment.comments;
        let commentsBlock;
        if (comments.ids.length > 0) {
            commentsBlock = mapNodes(comments, function(comment, index){
                let added = this.props.comment.added && index == 0;
               return <Comment
                   key={comment.id} 
                   comment={comment}
                   added={added}
               />

            }.bind(this));
        }


      return (

        <div className="full_post">
            <Helmet title={post.body.slice(0, 20)}/>
            <div className="full_post_detail">
            <Post
                key={post.id}
                userId={this.props.userId}
                post={post}
                tags={this.props.tags}
                logged={this.props.logged}
                token={this.props.token}
                userId={this.props.userId}
                rated={post.rated}
                ratePost={this.props.postActions.ratePost}
            />
            </div>

            <h3>Комментарии</h3>
            <div className="add_comment_form_block">
            <label>Добавить комментарий</label>
        <ReactCSSTransitionGroup
        transitionName="add_comment"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1}
        className='add_comment_form_transition'
        >
            {this.getAddCommentForm.call(this)}
        </ReactCSSTransitionGroup>
             </div>   
            <input
                onClick={this.refreshCommentsClick.bind(this)}
                type="button"
                className="btn btn-default"
                value="Обновить"
            />
            <div className="comments">
            {commentsBlock}
            </div>    
            <input
                onClick={this.loadMoreCommentsClick.bind(this)}
                type="button"
                className={classNames('btn', 'btn-default', {hidden: post.comments.length <= this.props.comment.comments.ids.length})}
                value="Показать еще"
            />

        </div>

      )

      }

}

