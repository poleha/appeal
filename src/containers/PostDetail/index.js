import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Post from '../../components/Post'
import { CommentCreateForm } from '../../components/CommentForm'
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
        comment: state.comment,
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
        }).then(() => {
            return store.dispatch(commentActions.loadComments({post: id}))
        });
        promises.push(currentPromise);

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostDetail extends BaseComponent {


 


    getPost() {
        return this.props.post.posts.entities[this.props.params.id];
    }




    loadMoreCommentsClick(e) {

        this.props.commentActions.loadComments({post: this.props.params.id, limit: this.props.comment.comments.ids.length + 10} )

    }

    refreshCommentsClick(e) {
        e.preventDefault();
        this.props.commentActions.cleanComments();
        this.props.postActions.loadPosts({id: this.props.params.id});
        this.props.commentActions.loadComments({post: this.props.params.id} )

    }



    getAddedBlock() {
        if (this.props.comment.added) {
            return <div className="added_message">
                Ваш комментарий добавлен
            </div>
        }
    }


    getCommentsBlock() {
        if (this.props.comment.loading && this.props.comment.comments === null) return null;

        let comments = this.props.comment.comments;
        let commentsBlock = mapNodes(comments, function(comment, index){
                let added = this.props.comment.added && index == 0;
                return <Comment
                    key={comment.id}
                    comment={comment}
                    userId={this.props.userId}
                    added={added}
                />

            }.bind(this));
        return commentsBlock
        }


    getShowMoreButton() {
        if (this.props.comment.comments == null || this.props.post.posts == null) return null;
        let post = this.props.post.posts.entities[this.props.params.id];
        let showMoreInput;
        if (post.comments.length > this.props.comment.comments.ids.length) {
            showMoreInput = (
                <input
                    key="comment_show_more_button"
                    onClick={this.loadMoreCommentsClick.bind(this)}
                    type="button"
                    className="button button_middle button_height"
                    value="Показать еще"
                />
            )
        }
        return showMoreInput;

    }

    render() {
       let post = this.getPost();
      return (

        <div className="full_post">
            <Helmet title={post.body.slice(0, 20)}/>
            <section className="cards">
            <div className="full_post_detail">
            <Post
                key={post.id}
                post={post}
                tags={this.props.tags}
                logged={this.props.logged}
                token={this.props.token}
                userId={this.props.userId}
                rated={post.rated}
                ratePost={this.props.postActions.ratePost}
            />
            </div>
            </section>

            
             <h1 className="section_name">Отправить комментарий</h1>
        
            
                <CommentCreateForm {...this.props}/>
                {this.getAddedBlock()}
            <div className="section_name_small">Комментарии</div>
            <a
                onClick={this.refreshCommentsClick.bind(this)}
                type="button"
                className="button button_left button_height button_reload"
            >
                Обновить
            </a>
            <section className="cards">
            <ReactCSSTransitionGroup
                transitionName="comments"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1}
                className='comments'
            >
            {this.getCommentsBlock()}
                <p className="text-center">
                {this.getShowMoreButton()}
                  </p>
            </ReactCSSTransitionGroup>
            </section>

        </div>

      )

      }

}

