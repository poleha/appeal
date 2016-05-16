import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import Post from '../../components/Post'
import Comment from '../../components/Comment'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'


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


@connect(mapStateToProps, mapDispatchToProps)
export default class PostDetail extends Component {

    getFieldErrors(fieldName){
        let fieldErrors = this.props.comment.errors[fieldName];
        if (fieldErrors) {
            let errorsBlock;
            errorsBlock = fieldErrors.map(function (error, index) {
                return (
                    <li className="error" key={index}>
                        {error}
                    </li>
                )
            });
            return (
                <ul className="errors">
                    {errorsBlock}
                </ul>
            )
        }
    }

    getPost() {
        return this.props.post.posts[this.props.params.id];
    }


    isReady() {
        return this.props.post.posts && this.props.comment.comments && this.props.logged;
    }


    loadAjax() {

        if(this.props.logged) {
            let id = this.props.params.id;

            if ((this.props.post.posts === null || this.props.path != this.props.post.path) && !this.props.post.loading) {

                this.props.postActions.loadPosts({id}, this.props.path);
                this.props.commentActions.loadComments({post: id});

            }


        }
    }

    componentDidMount() {
        this.loadAjax();
    }

    componentDidUpdate() {

        this.loadAjax();



        if (this.props.comment.added) {

            ReactDOM.findDOMNode(this.refs.add_comment_username).value = '';
            ReactDOM.findDOMNode(this.refs.add_comment_email).value = '';
            ReactDOM.findDOMNode(this.refs.add_comment_body).value = '';
        }
    }

    addCommentFormSubmit(e) {
        e.preventDefault();
        let username = ReactDOM.findDOMNode(this.refs.add_comment_username).value;
        let email = ReactDOM.findDOMNode(this.refs.add_comment_email).value;
        let body = ReactDOM.findDOMNode(this.refs.add_comment_body).value;

        let comment = { username, body, email, post: this.props.params.id };
        this.props.commentActions.addComment(comment);
    }

    loadMoreCommentsClick(e) {

        this.props.commentActions.loadComments({post: this.props.params.id, limit: this.props.comment.comments.length + 10} )

    }

    refreshCommentsClick(e) {
        this.props.postActions.loadPosts({id: this.props.params.id}, this.props.path);
        this.props.commentActions.loadComments({post: this.props.params.id} )

    }

    getAddCommentForm() {
        let usernameInputClass = classNames('add_comment_username',
        {
            hidden: this.props.userId
        });
        
        let emailImputClass = classNames('add_comment_email',
            {
                hidden: this.props.userId
            });
        if (this.props.post.posts && this.props.comment.comments){
        return (
            <div>
            <form
                onSubmit={this.addCommentFormSubmit.bind(this)}
                className="add_comment_form"
            >
                {this.getFieldErrors.call(this, 'username')}
                <input
                    ref="add_comment_username"
                    className={usernameInputClass}
                    placeholder="Автор"
                    type="text"
                />
                {this.getFieldErrors.call(this, 'email')}
                <input
                    ref="add_comment_email"
                    className={emailImputClass}
                    placeholder="E-mail"
                    type="text"
                />
                {this.getFieldErrors.call(this, 'body')}
            <textarea cols="70" rows="10"
                      ref="add_comment_body"
                      className='add_comment_body'
                      placeholder="Комментарий"
            />

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
        else return null;
    }

    getAddedBlock() {
        if (this.props.comment.added) {
            return <div className="added_message">
                Ваш комментарий добавлен
            </div>
        }
    }

    render() {
      if (this.isReady()) {
       let post = this.props.post.posts[this.props.params.id];
      let comments = this.props.comment.comments;
        let commentsBlock;
        if (comments.length > 0) {
            commentsBlock = comments.map((comment, index)=>{
                let added = this.props.comment.added && index == 0;
               return <Comment 
                   key={comment.id} 
                   comment={comment}
                   added={added}
               />

            });
        }


      return (
        <div className="full_post">
            <div className="full_post_detail">
            <Post
                key={post.id}
                userId={this.props.userId}
                post={post}
                tags={Object.values(this.props.tags)}
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
            {this.getAddCommentForm.call(this)}
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
                className={classNames('btn', 'btn-default', {hidden: post.comments.length <= this.props.comment.comments.length})}
                value="Показать еще"
            />

        </div>
      )

      }
        else {
          return null;
      }
    }
}

