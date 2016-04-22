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
      ReactDOM.findDOMNode(this.refs.add_post_title).value = '';
      ReactDOM.findDOMNode(this.refs.add_post_body).value = '';

      let tagsElem = $(ReactDOM.findDOMNode(this.refs.tags)).find('input').removeAttr('checked');

    }
  }


  getPost() {
      let username = ReactDOM.findDOMNode(this.refs.add_post_username).value;
      let title = ReactDOM.findDOMNode(this.refs.add_post_title).value;
      let body = ReactDOM.findDOMNode(this.refs.add_post_body).value;
      let tagsElem = ReactDOM.findDOMNode(this.refs.tags);
      let inputs = $(tagsElem).find('input');
      let tags = [];
      inputs.each(function(key) {
      let elem = inputs[key];
        let id = elem.getAttribute('data-id');
      if (elem.checked) tags.push(id);
      });

    let post = {title, username, body, tags};
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

  loadMorePostsClick(e) {

    this.props.actions.loadPosts({tags__alias: this.props.path, limit: this.props.data.posts.length + 10} )

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
          <div>
            <a href={'#post/' + key}>{elem.title}</a>
          </div>
          <div>{elem.body}</div>
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
          <label>{elem.title}</label>
          <input key={key} data-id={key}
              type="checkbox"
          />
        </li>
      });
    }
    else {
      tagsBlock = ''
    }

    return <div>
      <input
          onClick={this.props.actions.loadPosts.bind(this, this.props.path)}
          type="button"
          value="Обновить">
      </input>
      <div hidden={this.props.logged}>
        Автор
     <input
        disabled={this.getAddPostButtonDisabled.bind(this)()}
        ref="add_post_username"
        className="add_post_username"
        type="text">
    </input>
        </div>
      Название
        <input
            disabled={this.getAddPostButtonDisabled.bind(this)()}
            ref="add_post_title"
            className="add_post_title"
            type="text">

        </input>
      Призыв
      <input
          disabled={this.getAddPostButtonDisabled.bind(this)()}
          ref="add_post_body"
          className="add_post_body"
          type="text">

      </input>
      <ul className='tags_add' ref="tags">
        {tagsBlock}
      </ul>


      <input
          onClick={this.addPostClick.bind(this)}
          disabled={this.getAddPostButtonDisabled.bind(this)()}
          type="button"
          value="Добавить">
      </input>
      {postsBlock}
      <input
          hidden={this.props.data.count <= this.props.data.posts.length}
          onClick={this.loadMorePostsClick.bind(this)}
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