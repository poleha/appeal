import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import PostDetail from '../../components/PostDetail'
import Comment from '../../components/Comment'
import classNames from 'classnames'

export default class Post extends Component {

    getFieldErrors(fieldName){
        let fieldErrors = this.props.data.addCommentErrors[fieldName];
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
    
    componentDidMount() {
        let id = this.props.path.split('/')[1];
        this.props.actions.loadPosts({id});
        this.props.actions.loadComments({post: id});
    }

    componentDidUpdate() {
        if (this.props.data.added) {

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

        let comment = { username, body, email, post: this.props.data.posts[0].id };
        this.props.actions.addComment(comment);
    }

    loadMoreCommentsClick(e) {

        this.props.actions.loadComments({post: this.props.data.posts[0].id, limit: this.props.data.comments.length + 10} )

    }

    refreshCommentsClick(e) {
        this.props.actions.loadPosts({id: this.props.data.posts[0].id});
        this.props.actions.loadComments({post: this.props.data.posts[0].id} )

    }

    getAddCommentForm() {
        let usernameInputClass = classNames('add_comment_username',
        {
            hidden: this.props.logged
        });
        
        let emailImputClass = classNames('add_comment_email',
            {
                hidden: this.props.logged
            });

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

    getAddedBlock() {
        if (this.props.data.added) {
            return <div className="added_message">
                Ваш комментарий добавлен
            </div>
        }
    }

    render() {
      let post = this.props.data.posts[0];
      if (post) {
      let comments = this.props.data.comments;
        let commentsBlock;
        if (comments.length > 0) {
            commentsBlock = comments.map((comment, index)=>{
                let added = this.props.data.added && index == 0;
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
            <PostDetail key={post.id} post={post} tags={this.props.tags} logged={this.props.logged} ratePost={this.props.ratePost} />
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
                className={classNames('btn', 'btn-default', {hidden: post.comments.length <= this.props.data.comments.length})}
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

