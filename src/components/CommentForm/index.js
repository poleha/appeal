import React, { PropTypes, Component } from 'react'

import BaseComponent from '../../components/BaseComponent'
import SmileysTextArea from '../../components/SmileysTextArea'
import classNames from 'classnames'
import { formArrayToJson, mapNodes } from '../../helpers/helper'


class BaseCommentForm extends BaseComponent {

    getComment() {
        let commentForm = $(this._addCommentForm);

        return formArrayToJson(commentForm.serializeArray());
    }


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
            <section className="add bg_grey">
            <div key="add_comment_form_key" className="in">
                <form
                    onSubmit={this.addCommentFormSubmit.bind(this)}
                    className="add_comment_form"
                    ref={(c) => this._addCommentForm = c}
                >
                    <div className={usernameInputClass}>
                        {this.getFieldErrors('username', 'comment')}
                        <input
                            ref={(c) => this._addCommentUserName = c}
                            placeholder="Автор"
                            type="text"
                        />
                    </div>
                    <div className={emailImputClass}>
                        {this.getFieldErrors('email', 'comment')}
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
        return (
            <div className="form_field">
                {this.getFieldErrors('body', 'comment')}
            <SmileysTextArea ref={(c) => this._smileysTextArea = c} />
            </div>
        )
    }


    componentDidUpdate() {
        if (this.props.comment.added) {

            this._addCommentUserName.value = '';
            this._addCommentEmail.value = '';
            this._smileysTextArea._body.value = '';
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
                {this.getFieldErrors('body', 'comment')}
            <SmileysTextArea defaultValue={comment.body} ref={(c) => this._smileysTextArea = c}/>
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



