import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'



export default class Page extends Component {
  componentDidMount() {
    if (!this.props.data.loaded) {
    this.props.actions.loadPosts();
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

  getAddPostButtonState() {
  if (!this.props.data.loaded || this.props.data.adding || this.props.data.loading){
    return true;
  }
    else {
    return false;
  }
  }

  render() {
    let posts = this.props.data.posts;
    let addPost = this.props.actions.addPost;

    let postsBlock;
    if (posts.length > 0) {
      postsBlock = posts.map((elem, index)=>{
        return <div key={elem.id}>
          <div>{elem.author}</div>
          <div>{elem.title}</div>
          <div>{elem.body}</div>
        </div>
      });
    }
    else {
      postsBlock = ''
    }

    return <div>
      Автор<input ref="add_post_author" class="add_post_author" type="text"></input>
      Название<input ref="add_post_title" class="add_post_title" type="text"></input>
      Призыв<input ref="add_post_body" class="add_post_body" type="text"></input>
      <input onClick={this.addPostClick.bind(this)} disabled={this.getAddPostButtonState.bind(this)()} type="button" value="Добавить"></input>
      {postsBlock}
    </div>
  }
}

Page.propTypes = {
  //year: PropTypes.number.isRequired,
  //photos: PropTypes.array.isRequired,
  //setYear: PropTypes.func.isRequired
}