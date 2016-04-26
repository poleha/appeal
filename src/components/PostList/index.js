import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { formArrayToJson } from '../../helper'

import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/PostList'


export default class PostList extends Component {
  

  //componentDidMount() {
  //  if (this.props.data.loaded) {
  //      this.props.actions.refreshPosts(this.props.path);
  //  }
  //  else {

  //  }
 // }

  componentDidUpdate(){


    if (this.props.data.added){
      ReactDOM.findDOMNode(this.refs.add_post_username).value = '';
      ReactDOM.findDOMNode(this.refs.add_post_body).value = '';
      let tagsElem = $(ReactDOM.findDOMNode(this.refs.tags)).find('input').removeAttr('checked');
    }
  }

  getPost() {
      let postForm = $(ReactDOM.findDOMNode(this.refs.add_post_form));
    
      return formArrayToJson(postForm.serializeArray());
  }

  addPostSubmit(e) {
    e.preventDefault();
  let post = this.getPost();
   this.props.actions.addPost(post);
  }

  getAddPostButtonDisabled() {
  if (!this.props.data.loaded || this.props.data.adding || this.props.data.loading){
    return true;
  }
    else {
    return false;
  }
  }

    ratePostClick(key, actionType){
    this.props.actions.ratePost(key, actionType)
    }

  loadMorePostsClick(e) {

    this.props.actions.loadPosts({tags__alias: this.props.path, limit: this.props.data.posts.length + 10} )

  }

  refreshPostsClick(e) {

    this.props.actions.loadPosts({tags__alias: this.props.path} )

  }

  getFieldErrors(fieldName){
    let fieldErrors = this.props.data.addPostErrors[fieldName];
    if (fieldErrors) {
    let errorsBlock;
    errorsBlock = fieldErrors.map(function (error, index) {
    return (
      <li key={index}>
        {error}
      </li>
    )
    });
    return (
    <ul>
      {errorsBlock}
      </ul>
    )
    }
  }

  getRateBlock(elem) {
    let key = elem.id;
    let rateBlock;
   if (this.props.logged && !elem.rated) {
     rateBlock = (
       <div>
        <input
        disabled={elem.rating}
        onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_LIKE)}
        type="button"
        className="btn btn-success"
        value="Нравится"
        />
        <input
        disabled={elem.rating}
        onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_DISLIKE)}
        type="button"
        className="btn btn-danger"
        value="Не нравится"
        />
         </div>
   )
   }
    return rateBlock;
  }

  render() {
    let posts = this.props.data.posts;
    let tags = this.props.tags;
    //let addPost = this.props.actions.addPost;

    let showMoreInput;
    if (this.props.data.count > this.props.data.posts.length) {
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
    if (posts.length > 0) {
      postsBlock = posts.map((elem, index)=>{
       let key =  elem.id;
        return <div key={key}>
          <label>Автор:</label>
          <div>{elem.username}</div>

          <label>Призыв:</label>
          <div><a href={'#post/' + key}>{elem.body}</a></div>

          <label>Опубликовано:</label>
          <div>{elem.created}</div>

           <label>Нравится:</label>
          <div>{elem.liked}</div>

          <label>Не нравится:</label>
          <div>{elem.disliked}</div>

           <div><a href={'#post/' + key}>Комментариев: {elem.comment_count}</a></div>

          <label>Метки:</label>
          <ul className="tags">
          {
            this.props.tags.map(function(tag) {
              if (elem.tags.indexOf(tag.id) >= 0) {
              return <li className="tag_elem" key={tag.id}>{tag.title}</li>
              }
            })
          }
          </ul>
          {this.getRateBlock.call(this, elem)}
        </div>
      });
    }
    else {
      postsBlock = ''
    }

    let tagsAddBlock;
    if (tags.length > 0) {
      tagsAddBlock = tags.map((elem, index)=>{
        let key =  elem.id;
        return <li key={key}>
          <input
              key={key}
              data-id={key}
              id={`tags_input-${key}`}
              type="checkbox"
              name={`tags__${key}`}
              disabled={this.getAddPostButtonDisabled.call(this)}
          />
          <label htmlFor={`tags_input-${key}`}>{elem.title}</label>
        </li>
      });
    }
    else {
      tagsAddBlock = ''
    }

    return <div>

      <form
          onSubmit={this.addPostSubmit.bind(this)}
          className="add_post_form"
          ref="add_post_form"
      >
      <div hidden={this.props.logged}>

        {this.getFieldErrors.call(this, 'username')}

        <input
        disabled={this.getAddPostButtonDisabled.call(this)}
        ref="add_post_username"
        className="add_post_username"
        id="add_post_username"
        name="username"
        placeholder="Автор"
        type="text">
    </input>
        </div>


        {this.getFieldErrors.call(this, 'body')}

      <textarea cols="70" rows="10"
          disabled={this.getAddPostButtonDisabled.bind(this)()}
          ref="add_post_body"
          className="add_post_body"
          id="add_post_body"
          name="body"
          placeholder="Сообщение"
          type="text">

      </textarea>

        <label htmlFor="tags_add_ul">Разделы:</label>

        {this.getFieldErrors.call(this, 'tags')}

      <ul className='tags_add' ref="tags" id="tags_add_ul">
        {tagsAddBlock}
      </ul>

      <input
          disabled={this.getAddPostButtonDisabled.call(this)}
          type="submit"
          className="btn btn-default"
          value="Добавить">
      </input>
      </form>

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





PostList.propTypes = {
  //year: PropTypes.number.isRequired,
  //photos: PropTypes.array.isRequired,
  //setYear: PropTypes.func.isRequired
}

PostList.contextTypes = {
  //router: PropTypes.object.isRequired
}