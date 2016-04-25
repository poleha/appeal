import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'


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
      let username = ReactDOM.findDOMNode(this.refs.add_post_username).value;
      let body = ReactDOM.findDOMNode(this.refs.add_post_body).value;
      let tagsElem = ReactDOM.findDOMNode(this.refs.tags);
    //TODO
      let inputs = $(tagsElem).find('input');
      let tags = [];
      inputs.each(function(key) {
      let elem = inputs[key];
        let id = elem.getAttribute('data-id');
      if (elem.checked) tags.push(id);
      });

    let post = {username, body, tags};
      return post
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
    console.log(this.props.data, '3333333333333333333333333')
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


  render() {
    let posts = this.props.data.posts;
    let tags = this.props.tags;
    //let addPost = this.props.actions.addPost;

    let postsBlock;
    if (posts.length > 0) {
      postsBlock = posts.map((elem, index)=>{
       let key =  elem.id;
        return <div key={key}>
          <div>{elem.username}</div>
          <div><a href={'#post/' + key}>{elem.body}</a></div>
            Liked:<div>{elem.liked}</div>
            Disliked:<div>{elem.disliked}</div>
          <ul>
          {
            this.props.tags.map(function(tag) {
              if (elem.tags.indexOf(tag.id) >= 0) {
              return <li key={tag.id}>{tag.title}</li>
              }
            })
          }
          </ul>
          <input
              hidden={!this.props.logged || elem.rated}
              disabled={elem.rating}
              onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_LIKE)}
              type="button"
              value="Нравится"
          />
          <input
              hidden={!this.props.logged || elem.rated}
              disabled={elem.rating}
              onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_DISLIKE)}
              type="button"
              value="Не нравится"
          />
        </div>
      });
    }
    else {
      postsBlock = ''
    }

    let tagsBlock;
    if (tags.length > 0) {
      tagsBlock = tags.map((elem, index)=>{
        let key =  elem.id;
        return <li key={key}>
          <input key={key} data-id={key} id={`tags_input-${key}`}
              type="checkbox"
          />
          <label htmlFor={`tags_input-${key}`}>{elem.title}</label>
        </li>
      });
    }
    else {
      tagsBlock = ''
    }

    return <div>
      <input
          onClick={this.refreshPostsClick.bind(this)}
          type="button"
          value="Обновить">
      </input>

      <form onSubmit={this.addPostSubmit.bind(this)} className="add_post_form">
      <div hidden={this.props.logged}>
        <label htmlFor="add_post_username">Автор</label>

        {this.getFieldErrors.call(this, 'username')}

        <input
        disabled={this.getAddPostButtonDisabled.bind(this)()}
        ref="add_post_username"
        className="add_post_username"
        id="add_post_username"
        name="username"
        type="text">
    </input>
        </div>

      <label htmlFor="add_post_body">Призыв</label>

        {this.getFieldErrors.call(this, 'body')}

      <textarea cols="70" rows="10"
          disabled={this.getAddPostButtonDisabled.bind(this)()}
          ref="add_post_body"
          className="add_post_body"
          id="add_post_body"
          name="body"
          type="text">

      </textarea>

        <label htmlFor="tags_add_ul">Разделы</label>

        {this.getFieldErrors.call(this, 'tags')}

      <ul className='tags_add' ref="tags" id="tags_add_ul">
        {tagsBlock}
      </ul>

      <input
          disabled={this.getAddPostButtonDisabled.bind(this)()}
          type="submit"
          className="btn btn-default"
          value="Добавить">
      </input>
      </form>

      {postsBlock}
      <input
          hidden={this.props.data.count <= this.props.data.posts.length}
          onClick={this.loadMorePostsClick.bind(this)}
          className="btn btn-default"
          type="button"
          value="Показать еще">
      </input>
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