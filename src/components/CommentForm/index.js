import React, { PropTypes, Component } from 'react'

import BaseSmileyForm from '../../components/BaseSmileyForm'
import classNames from 'classnames'
import { formArrayToJson, mapNodes } from '../../helpers/helper'


class BaseCommentForm extends BaseSmileyForm {

    getComment() {
        let commentForm = $(this._addCommentForm);

        return formArrayToJson(commentForm.serializeArray());
    }


    render() {

        let username_errors = this.getFieldErrors('username', 'comment')
        let email_errors = this.getFieldErrors('email', 'comment')

        let usernameInputClass = classNames('form_field',
            {
                hidden: this.props.userId,
                has_errors: username_errors
            });

        let emailImputClass = classNames('form_field',
            {
                hidden: this.props.userId,
                has_errors: email_errors
            });
        return (
            <section className="add bg_grey">
            <div key="add_comment_form_key" className="in">
                <form
                    onSubmit={this.addCommentFormSubmit.bind(this)}
                    className="add_comment_form"
                    ref={(c) => this._addCommentForm = c}
                >
                    <div className={usernameInputClass}>
                        {username_errors}
                        <input
                            ref={(c) => this._addCommentUserName = c}
                            placeholder="Автор"
                            type="text"
                        />
                    </div>
                    <div className={emailImputClass}>
                        {email_errors}
                        <input
                            ref={(c) => this._addCommentEmail = c}
                            placeholder="E-mail(не обязательно)"
                            type="text"
                        />
                    </div>
                    {this.getBodyField()}
                    <input
                        type="submit"
                        className="btn btn-default"
                        value="Добавить"
                    />
                </form>
                
            </div>
                </section>

        )
    }
    
}


export class CommentCreateForm extends BaseCommentForm {

    
    addCommentFormSubmit(e) {
        e.preventDefault()
        let postId = this.props.params.id;
        let comment = this.getComment();
        comment.post = postId;


        this.props.commentActions.addComment(comment);
    }

    getBodyField() {
        let bodyField = this.getSmileyForm()
        let body_errors = this.getFieldErrors('email', 'comment')
        return (
            <div className={classNames("form_field", {has_errors: body_errors})}>
                {this.getFieldErrors('body', 'comment')}
                {bodyField}
            </div>
        )
    }


    componentDidUpdate() {
        if (this.props.comment.added) {

            this._addCommentUserName.value = '';
            this._addCommentEmail.value = '';
            this._body.value = '';

            $('html, body').animate({
                scrollTop: $(".added").offset().top
            }, 500);


        }
    }



}



export class CommentUpdateForm extends BaseCommentForm {


    getBodyField() {
        let comment = this.props.comment.comments.entities[this.props.params.id];
        let bodyField = this.getSmileyForm(comment.body)
        let body_errors = this.getFieldErrors('email', 'comment')
                
        return (
            <div className={classNames("form_field", {has_errors: body_errors})}>
                {body_errors}
                {bodyField}
            </div>
        )
    }

    addCommentFormSubmit(e) {
        e.preventDefault();
        //let username = this._addCommentUserName.value;
        //let email = this._addCommentEmail.value;
        let existingComment = this.props.comment.comments.entities[this.props.params.id];
        let post = existingComment.post;
        let comment = this.getComment();
        comment.id = this.props.params.id
        comment.post = post

        this.props.commentActions.updateComment(comment);
    }



}



