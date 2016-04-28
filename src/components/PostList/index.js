import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { formArrayToJson } from '../../helper'
import PostDetail from '../../components/PostDetail'

export default class PostList extends Component {


  //constructor(props) {
  //  super(props);
  //  this.state = {
  //
  //  };
 // }

  componentDidUpdate(){


    if (this.props.data.added){
      ReactDOM.findDOMNode(this.refs.add_post_username).value = '';
      ReactDOM.findDOMNode(this.refs.add_post_email).value = '';
      ReactDOM.findDOMNode(this.refs.add_post_body).value = '';
      //let tagsElem = $(ReactDOM.findDOMNode(this.refs.tags)).find('input').removeAttr('checked');
    }
    if (this.props.data.loading || this.props.data.added) {
    for (let key = 0; key < this.props.tags.length; key++) {
      let alias = this.props.tags[key].alias;
      let checked = this.props.path == alias;
      ReactDOM.findDOMNode(this.refs[`tag_to_add__${alias}`]).checked = checked;
    }
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

  getAddedBlock() {
    if (this.props.data.added) {
      return <div className="added_message">
        Ваш призыв добавлен
      </div>
    }
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
      let added = this.props.data.added && index == 0;

      return <PostDetail 
          key={elem.id}
          post={elem} 
          tags={this.props.tags}
          logged={this.props.logged} 
          ratePost={this.props.actions.ratePost}
          added={added} 
          userId={this.props.userId}
      />
        
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
              defaultChecked={this.props.path == elem.alias}
              data-id={key}
              id={`tags_input-${key}`}
              type="checkbox"
              ref={`tag_to_add__${elem.alias}`}
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

    return <div className="post_list">
      <div className="add_post_form_block">
      <h3>Опубликовать призыв</h3>
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
        type="text"
        />
        </div>

        <div hidden={this.props.logged}>

          {this.getFieldErrors.call(this, 'email')}

          <input
              disabled={this.getAddPostButtonDisabled.call(this)}
              ref="add_post_email"
              className="add_post_email"
              id="add_post_email"
              name="email"
              placeholder="E-mail"
              type="text"
          />
        </div>


        {this.getFieldErrors.call(this, 'body')}

      <textarea cols="70" rows="10"
          disabled={this.getAddPostButtonDisabled.bind(this)()}
          ref="add_post_body"
          className="add_post_body"
          id="add_post_body"
          name="body"
          placeholder="Сообщение"
          type="text"
      />


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





PostList.propTypes = {
  //year: PropTypes.number.isRequired,
  //photos: PropTypes.array.isRequired,
  //setYear: PropTypes.func.isRequired
}

PostList.contextTypes = {
  //router: PropTypes.object.isRequired
}