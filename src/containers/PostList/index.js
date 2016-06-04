import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { formArrayToJson } from '../../helper'
import Post from '../../components/Post'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/PostActions'
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
    postActions: bindActionCreators(postActions, dispatch)
  };
}

@asyncConnect([{
  promise: (params, helpers) => {
    let store = params.store
    let tag = params.params.tag
    let promises = []
    promises.push(store.dispatch(postActions.loadPosts({tags__alias: tag}, tag)))

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostList extends BaseComponent {

    setDefaultTags() {
        for (let key = 0; key < this.props.tags.ids.length; key++) {
            let alias = this.props.tags.entities[this.props.tags.ids[key]].alias;
            let checked = this.props.params.tag == alias;
            let elem = ReactDOM.findDOMNode(this[`_tag_to_add__${alias}`]);
            if (elem) elem.checked = checked; //При первом рендере могут быть недоступны, поскольку мы ничего не рендерим
        }
    }


  componentDidUpdate(prevProps){

    if (this.props.post.added || this.props.params.tag != prevProps.params.tag){
      ReactDOM.findDOMNode(this._add_post_username).value = '';
      ReactDOM.findDOMNode(this._add_post_email).value = '';
      ReactDOM.findDOMNode(this._add_post_body).value = '';
        this.setDefaultTags();
    }

  }

  getPost() {
      let postForm = $(ReactDOM.findDOMNode(this._add_post_form));
    
      return formArrayToJson(postForm.serializeArray());
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



  loadMorePostsClick(e) {

    this.props.postActions.loadPosts({tags__alias: this.props.params.tag, limit: this.props.post.posts.ids.length + 10}, this.props.params.tag )

  }

  refreshPostsClick(e) {

    this.props.postActions.loadPosts({tags__alias: this.props.params.tag} , this.props.params.tag)

  }



  getAddedBlock() {
    if (this.props.post.added) {
      return <div className="added_message">
        Ваш призыв добавлен
      </div>
    }
  }

    getAddPostForm() {
        if (this.props.post.adding) return null;
        let tags = this.props.tags;
        let tagsAddBlock;
        if (tags.ids.length > 0) {
            tagsAddBlock = mapNodes(tags, function(elem){
                let key = elem.id;
                return <li key={key}>
                    <input
                        key={key}
                        defaultChecked={this.props.params.tag == elem.alias}
                        data-id={key}
                        id={`tags_input-${key}`}
                        type="checkbox"
                        ref={(c) => this[`_tag_to_add__${elem.alias}`] = c}
                        name={`tags__${key}`}
                        disabled={this.getAddPostButtonDisabled.call(this)}
                    />
                    <label htmlFor={`tags_input-${key}`}>{elem.title}</label>
                </li>
            }.bind(this));
        }
        else {
            tagsAddBlock = ''
        }

        return (
            <form
                key="add_post_form"
                onSubmit={this.addPostSubmit.bind(this)}
                className="add_post_form"
                ref={(c) => this._add_post_form = c}
            >
                <div className="form_field" hidden={this.props.userId}>
                    {this.getFieldErrors.call(this, 'username', 'post')}


                    <input
                        disabled={this.getAddPostButtonDisabled.call(this)}
                        ref={(c) => this._add_post_username = c}
                        className="add_post_username"
                        id="add_post_username"
                        name="username"
                        placeholder="Автор"
                        type="text"
                    />


                </div>

                <div className="form_field" hidden={this.props.userId}>

                    <input
                        disabled={this.getAddPostButtonDisabled.call(this)}
                        ref={(c) => this._add_post_email = c}
                        className="add_post_email"
                        id="add_post_email"
                        name="email"
                        placeholder="E-mail"
                        type="text"
                    />
                    {this.getFieldErrors.call(this, 'email', 'post')}
                </div>



                <div className="form_field">
                    {this.getFieldErrors.call(this, 'body', 'post')}
      <textarea cols="70" rows="10"
                disabled={this.getAddPostButtonDisabled.bind(this)()}
                ref={(c) => this._add_post_body = c}
                className="add_post_body"
                id="add_post_body"
                name="body"
                placeholder="Сообщение"
                type="text"
      />

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
                    value="Добавить">
                </input>
            </form>
        )
    }

  render() {
      let posts = this.props.post.posts;
      let tags = this.props.tags;
      //let addPost = this.props.actions.addPost;
      let currentTagTitle;
      Object.getOwnPropertyNames.call(this, tags.entities).forEach(function(key) {
          let tag = tags.entities[key]
          if (tag.alias == this.props.params.tag) currentTagTitle = tag.title;
      }.bind(this))
  
      let showMoreInput;
      if (this.props.post.count > posts.ids.length) {
        showMoreInput = (
            <input
                onClick={this.loadMorePostsClick.bind(this)}
                className="btn btn-default"
                type="button"
                value="Показать еще">
            </input>
        )
      }

      let postsBlock;
      if (posts.ids.length > 0) {
        postsBlock = mapNodes(posts, function(elem, index){
          let added = this.props.post.added && index == 0;

          return <Post
              key={elem.id}
              post={elem}
              tags={tags}
              logged={this.props.logged}
              token={this.props.token}
              ratePost={this.props.postActions.ratePost}
              added={added}
              userId={this.props.userId}
          />

        }.bind(this));
      }
      else {
        postsBlock = ''
      }




      return <div className="post_list">
          <Helmet title={currentTagTitle} />
        <div className="add_post_form_block">
          <h3>Опубликовать призыв</h3>
            <ReactCSSTransitionGroup
                transitionName="add_post"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1}
                className='add_comment_form_transition'
            >
            {this.getAddPostForm.call(this)}
                </ReactCSSTransitionGroup>
        </div>
        {this.getAddedBlock.call(this)}
        <input
            onClick={this.refreshPostsClick.bind(this)}
            type="button"
            className="btn btn-default"
            value="Обновить">
        </input>

        <div className="posts">
          {postsBlock}
        </div>

        {showMoreInput}
      </div>
  }
}





//PostList.propTypes = {
  //year: PropTypes.number.isRequired,
  //photos: PropTypes.array.isRequired,
  //setYear: PropTypes.func.isRequired
//}

//PostList.contextTypes = {
  //router: PropTypes.object.isRequired
//}