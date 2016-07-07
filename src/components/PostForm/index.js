import React, { PropTypes, Component } from 'react'

import BaseComponent from '../../components/BaseComponent'
import classNames from 'classnames'
import { formArrayToJson, mapNodes } from '../../helpers/helper'


class BasePostForm extends BaseComponent {


    getAdditionalFields() {
        return null;
    }


    getTagChecked(tag) {
        return false;
    }

    render() {


        let tags = this.props.tags;
        //let tag = this.props.tag;
        let tagsAddBlock;
        if (tags.ids.length > 0) {
            tagsAddBlock = mapNodes(tags, function(elem){
                let key = elem.id;
                return <li key={key}>
                    <input
                        key={key}
                        defaultChecked={this.getTagChecked.call(this, elem)}
                        data-id={key}
                        id={`tags_input-${key}`}
                        type="checkbox"
                        ref={(c) => this[`_tag_to_add__${elem.alias}`] = c}
                        name={`tags__${key}`}
                        //disabled={this.getAddPostButtonDisabled.call(this)}
                    />
                    <label htmlFor={`tags_input-${key}`}>{elem.title}</label>
                </li>
            }.bind(this));
        }
        else {
            tagsAddBlock = ''
        }

        return (
            <div>
                <form
                    key="add_post_form"
                    onSubmit={this.addPostSubmit.bind(this)}
                    className="add_post_form"
                    ref={(c) => this._addPostForm = c}
                >
                   
                    {this.getAdditionalFields.call(this)}


                    <div className="form_field">
                        {this.getFieldErrors.call(this, 'body', 'post')}
                        {this.getBodyField.call(this)}

                    </div>
                    <label htmlFor="tags_add_ul">Разделы:</label>

                    <div className="form_field">
                        {this.getFieldErrors.call(this, 'tags', 'post')}
                        <ul
                            className='tags_add'
                            //ref="tags"
                            id="tags_add_ul">
                            {tagsAddBlock}
                        </ul>

                    </div>
                    <input
                        disabled={this.getAddPostButtonDisabled.call(this)}
                        type="submit"
                        className="btn btn-default"
                        value="Отправить">
                    </input>
                </form>
                
            </div>
        )
    }



    getPost() {
        let postForm = $(this._addPostForm);

        return formArrayToJson(postForm.serializeArray());
    }

}


export class PostUpdateForm extends BasePostForm {


    getAddPostButtonDisabled() {
        return false;
    }


    getTagChecked(tag) {
        let post = this.props.post.posts.entities[this.props.params.id];
        return post.tags.indexOf(tag.id) >= 0;
    }

    showAllFields() {
        return false;
    }

    getBodyField() {
        let post = this.props.post.posts.entities[this.props.params.id];
        return (
            <textarea cols="70" rows="10"
                      ref={(c) => this._postBody = c}
                      className={classNames('add_post_body')}
                      id="add_post_body"
                      defaultValue={post.body}
                      name="body"
                      placeholder="Сообщение"
                      type="text"
            />
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
        return tag.alias == this.props.tag;
    }

    constructor(props) {
        super(props)
        this.state = {
            bodyFocus: false
        }
    }

    showAllFields() {
        return true;
    }

    
    getAdditionalFields() {
        return (
            <div>
        <div className="form_field" hidden={this.props.userId}>
            {this.getFieldErrors.call(this, 'username', 'post')}


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
            {this.getFieldErrors.call(this, 'email', 'post')}
    </div>
                </div>
        )
    }

    getBodyField() {
      return (
          <textarea cols="70" rows="10"
                    ref={(c) => this._postBody = c}
                    className={classNames('add_post_body', {expanded: this.state.bodyFocus || (this._postBody && this._postBody.value.length > 0)})}
                    id="add_post_body"
                    onFocus={this.addPostBodyOnFocus.bind(this)}
                    name="body"
                    placeholder="Сообщение"
                    type="text"
          />
      )
    }

    getPathChanged(otherProps) {
        return this.props.tag != otherProps.tag;
    }

    componentDidUpdate(prevProps){
        let pathChanged = this.getPathChanged(prevProps)

        if (this.props.post.added || pathChanged){
            this._addPostUserName.value = '';
            this._addPostEmail.value = '';
            this._postBody.value = '';
            this.setDefaultTags();


        }

            }


    setDefaultTags() {
        for (let key = 0; key < this.props.tags.ids.length; key++) {
            let alias = this.props.tags.entities[this.props.tags.ids[key]].alias;
            let checked = this.props.tag == alias;
            let elem = this[`_tag_to_add__${alias}`];
            if (elem) elem.checked = checked; //При первом рендере могут быть недоступны, поскольку мы ничего не рендерим
        }
    }



    addPostSubmit(e) {
        e.preventDefault();
        let post = this.getPost();
        this.props.postActions.addPost(post);
    }

    addPostBodyOnFocus(e) {
        if (e.type == 'focus') this.setState({bodyFocus:true});
        //else this.setState({bodyFocus:false});

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