import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/Post'
import _ from 'lodash';

export default class Post extends Component {


  componentDidMount() {
    if (!this.props.data.loaded) {
    this.props.actions.loadPosts();
    }

  }

  componentDidUpdate(){
    if (this.props.data.added){
      ReactDOM.findDOMNode(this.refs.add_post_author).value = ''
      ReactDOM.findDOMNode(this.refs.add_post_title).value = ''
      ReactDOM.findDOMNode(this.refs.add_post_body).value = ''
    }
  }


  getPost() {
      let author = ReactDOM.findDOMNode(this.refs.add_post_author).value;
      let title = ReactDOM.findDOMNode(this.refs.add_post_title).value;
      let body = ReactDOM.findDOMNode(this.refs.add_post_body).value;
      let post = {title, author, body};
      return post
  }

  addPostClick(e) {
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

  render() {
    let posts = _.values(this.props.data.posts);
    let addPost = this.props.actions.addPost;

    let postsBlock;
    if (posts.length > 0) {
      postsBlock = posts.map((elem, index)=>{
       let key =  elem.id;
        return <div key={key}>
          <div>{elem.author}</div>
          <div>{elem.title}</div>
          <div>{elem.body}</div>
          <input disabled={this.props.data.posts[key].rating} onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_LIKE)} type="button" value="Нравится"/>
          <input disabled={this.props.data.posts[key].rating} onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_DISLIKE)} type="button" value="Не нравится"/>
        </div>
      });
    }
    else {
      postsBlock = ''
    }

    return <div>
      Автор<input disabled={this.getAddPostButtonDisabled.bind(this)()} ref="add_post_author" class="add_post_author" type="text"></input>
      Название<input disabled={this.getAddPostButtonDisabled.bind(this)()} ref="add_post_title" class="add_post_title" type="text"></input>
      Призыв<input disabled={this.getAddPostButtonDisabled.bind(this)()} ref="add_post_body" class="add_post_body" type="text"></input>
      <input onClick={this.addPostClick.bind(this)} disabled={this.getAddPostButtonDisabled.bind(this)()} type="button" value="Добавить"></input>
      {postsBlock}
    </div>
  }
}





Post.propTypes = {
  //year: PropTypes.number.isRequired,
  //photos: PropTypes.array.isRequired,
  //setYear: PropTypes.func.isRequired
}

Post.contextTypes = {
  router: PropTypes.object.isRequired
}