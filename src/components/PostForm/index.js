import React, { PropTypes, Component } from 'react'

import BaseSmileyForm from '../../components/BaseSmileyForm'
import { formArrayToJson, mapNodes } from '../../helpers/helper'


class BasePostForm extends BaseSmileyForm {


    getAdditionalFields() {
        return null;
    }


    getTagChecked(tag) {
        return false;
    }


    getTagField() {
        let tags = this.props.tags;
        //let tag = this.props.params.tag;
        let tagsAddBlock;
        if (tags.ids.length > 0 && this.state.bodyFocus) {
            tagsAddBlock = mapNodes(tags, function(elem){
                let key = elem.id;
                return <li
                    key={key}
                    className="col-xs-6"
                >
                    <label>
                        <input
                            key={key}
                            defaultChecked={this.getTagChecked(elem)}
                            data-id={key}
                            id={`tags_input-${key}`}
                            type="checkbox"
                            ref={(c) => this[`_tag_to_add__${elem.alias}`] = c}
                            name={`tags__${key}`}
                            //disabled={this.getAddPostButtonDisabled()}
                        />
                        {elem.title}
                    </label>

                </li>
            }.bind(this));
        }
    return tagsAddBlock
    }


    getSubmitButton() {
        if (!this.state.bodyFocus) return null;
        else {
            return (
        <input
            disabled={this.getAddPostButtonDisabled()}
            type="submit"
            className="button button_left"
            value="Отправить"
        />
            )
        }
    }


    render() {





        return (
            <section className="add bg_grey">
                <h1 className="section_name">Добавить предложение</h1>
                <div className="in">
                <form
                    key="add_post_form"
                    onSubmit={this.addPostSubmit.bind(this)}
                    className="add_post_form"
                    ref={(c) => this._addPostForm = c}
                >
                   
                    {this.getAdditionalFields()}


                    <div className="form_field">
                        {this.getFieldErrors('body', 'post')}
                        {this.getBodyField()}

                    </div>

                    <div className="form_field">
                        {this.getFieldErrors('tags', 'post')}
                        <div className="add_params">
                        <ul
                            className='tags_add row'
                            //ref="tags"
                            id="tags_add_ul">
                            {this.getTagField()}
                        </ul>
                            </div>

                    </div>
                    {this.getSubmitButton()}

                </form>
            </div>
            </section>
        )
    }



    getPost() {
        let postForm = $(this._addPostForm);

        return formArrayToJson(postForm.serializeArray());
    }

}


export class PostUpdateForm extends BasePostForm {

    constructor(props) {
        super(props)
        this.state = {
            bodyFocus: true
        }
    }


    getAddPostButtonDisabled() {
        return false;
    }


    getTagChecked(tag) {
        let post = this.props.post.posts.entities[this.props.params.id];
        return post.tags.indexOf(tag.id) >= 0;
    }



    getBodyField() {
        let post = this.props.post.posts.entities[this.props.params.id];
        return (
            this.getSmileyForm(post.body)
        )
    }
 

    addPostSubmit(e) {
        e.preventDefault();
        let post = this.getPost();
        let id = this.props.params.id;
        post.id = id;

        this.props.postActions.updatePost(post)
    }

}


export class PostCreateForm extends BasePostForm {



    getTagChecked(tag) {
        return tag.alias == this.props.params.tag;
    }


    componentWillReceiveProps(nextProps) {
        let pathChanged = this.getPathChanged(nextProps)
        if (pathChanged ) {

            if (this.state.bodyFocus) {
                this.setState({bodyFocus: false})
            }

        }
    }


    getAdditionalFields() {
        if (!this.state.bodyFocus) return null;
        return (
            <div>
        <div className="form_field" hidden={this.props.userId}>
            {this.getFieldErrors('username', 'post')}


            <input
                ref={(c) => this._addPostUserName = c}
                className="add_post_username"
                id="add_post_username"
                name="username"
                placeholder="Автор"
                type="text"
            />


        </div>

        <div className="form_field" hidden={this.props.userId}>

    <input
        ref={(c) => this._addPostEmail = c}
        className="add_post_email"
        id="add_post_email"
        name="email"
        placeholder="E-mail(не обязательно)"
        type="text"
            />
            {this.getFieldErrors('email', 'post')}
    </div>
                </div>
        )
    }

    getBodyField() {
      return (
          this.getSmileyForm('', true)
      )
    }


    componentDidUpdate(prevProps){
        let pathChanged = this.getPathChanged(prevProps)

        if (this.props.post.added || pathChanged){
            if (this._addPostUserName) this._addPostUserName.value = '';
            if (this._addPostEmail) this._addPostEmail.value = '';
            this._body.value = '';
            this.setDefaultTags();



        }

        if (this.props.post.added) {
            $('html, body').animate({
                scrollTop: $(".cards").offset().top + $('.card .added').height()
            }, 500);

        }



            }


    setDefaultTags() {
        for (let key = 0; key < this.props.tags.ids.length; key++) {
            let alias = this.props.tags.entities[this.props.tags.ids[key]].alias;
            let checked = this.props.params.tag == alias;
            let elem = this[`_tag_to_add__${alias}`];
            if (elem) elem.checked = checked; //При первом рендере могут быть недоступны, поскольку мы ничего не рендерим
        }
    }



    addPostSubmit(e) {
        e.preventDefault();
        let post = this.getPost();
        this.props.postActions.addPost(post);
    }




    getAddPostButtonDisabled() {
        if (!this.props.post.posts || this.props.post.adding || this.props.post.loading){
            return true;
        }
        else {
            return false;
        }
    }








}