import React, { PropTypes, Component } from 'react'

import BaseComponent from '../../components/BaseComponent'
import classNames from 'classnames'


class BaseCommentForm extends BaseComponent {




    render() {
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
                            placeholder="E-mail(не обязательно)"
                            type="text"
                        />
                    </div>
                    {this.getBodyField.call(this)}

                    <input
                        type="submit"
                        className="btn btn-default"
                        value="Добавить"
                    />
                </form>
                
            </div>

        )
    }
    
}


export class CommentCreateForm extends BaseCommentForm {

    constructor(props) {
        super(props)
        this.state = {
            bodyFocus: false
        }
    }
    
    addCommentFormSubmit(e) {
        e.preventDefault();
        let username = this._add_comment_username.value;
        let email = this._add_comment_email.value;
        let body = this._add_comment_body.value;

        let comment = { username, body, email, post: this.props.params.id };
        this.props.commentActions.addComment(comment);
    }

    getBodyField() {
        return (
            <div className="form_field">
                {this.getFieldErrors.call(this, 'body', 'comment')}
            <textarea cols="70" rows="10"
                      ref={(c) => this._add_comment_body = c}
                      className={classNames('add_comment_body', {expanded: this.state.bodyFocus || (this._add_comment_body && this._add_comment_body.value.length > 0)})}
                      onFocus={this.addCommentBodyOnFocus.bind(this)}
                      placeholder="Комментарий"
            />
            </div>
        )
    }


    componentDidUpdate() {
        if (this.props.comment.added) {

            this._add_comment_username.value = '';
            this._add_comment_email.value = '';
            this._add_comment_body.value = '';
        }
    }

    addCommentBodyOnFocus(e) {
        if (e.type == 'focus') this.setState({bodyFocus:true});

    }


}



export class CommentUpdateForm extends BaseCommentForm {


    getBodyField() {
        let comment = this.props.comment.comments.entities[this.props.params.id];
        return (
            <div className="form_field">
                {this.getFieldErrors.call(this, 'body', 'comment')}
            <textarea cols="70" rows="10"
                      ref={(c) => this._add_comment_body = c}
                      className={classNames('add_comment_body')}
                      placeholder="Комментарий"
                      defaultValue={comment.body}
            />
            </div>
        )
    }

    addCommentFormSubmit(e) {
        e.preventDefault();
        //let username = this._add_comment_username.value;
        //let email = this._add_comment_email.value;
        let existingComment = this.props.comment.comments.entities[this.props.params.id];
        let post = existingComment.post;
        let body = this._add_comment_body.value;

        let comment = { body, post, id: this.props.params.id };
        this.props.commentActions.updateComment(comment);
    }



}



