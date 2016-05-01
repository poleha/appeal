import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { formArrayToJson } from '../../helper'
import PostDetail from '../../components/PostDetail'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/PostActions'
import { connect } from 'react-redux'


function mapStateToProps(state) {
  return {
    post: state.post,
    comment: state.comment,
    tags: state.tag.tags,
    logged: state.user.logged,
    token: state.user.token,
    userId: state.user.userId,
    path: state.app.path
    };
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class PostList extends Component {


  //constructor(props) {
  //  super(props);
  //  this.state = {
  //
  //  };
 // }


  isReady() {
    return this.props.post.posts && this.props.logged;
  }

  loadAjax() {
    if(this.props.logged) {

      if ((this.props.post.posts === null || this.props.path != this.props.post.path) && !this.props.post.loading) {

        this.props.postActions.loadPosts({tags__alias: this.props.path}, this.props.path )

      }

    }

  }

  componentDidMount() {
    this.loadAjax();

  }

  componentDidUpdate(){
    this.loadAjax();

    if (this.props.post.added){
      ReactDOM.findDOMNode(this.refs.add_post_username).value = '';
      ReactDOM.findDOMNode(this.refs.add_post_email).value = '';
      ReactDOM.findDOMNode(this.refs.add_post_body).value = '';
      //let tagsElem = $(ReactDOM.findDOMNode(this.refs.tags)).find('input').removeAttr('checked');
    }
    if (this.props.post.loading || this.props.post.added) {
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

    this.props.postActions.loadPosts({tags__alias: this.props.path, limit: this.props.post.posts.length + 10}, this.props.path )

  }

  refreshPostsClick(e) {

    this.props.postActions.loadPosts({tags__alias: this.props.path} , this.props.path)

  }

  getFieldErrors(fieldName){
    let fieldErrors = this.props.post.errors[fieldName];
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
    if (this.props.post.added) {
      return <div className="added_message">
        Ваш призыв добавлен
      </div>
    }
  }

  render() {
    if (this.isReady()) {
      let posts = this.props.post.posts;
      let tags = this.props.tags;
      //let addPost = this.props.actions.addPost;

      let showMoreInput;
      if (this.props.post.count > this.props.post.posts.length) {
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
        postsBlock = posts.map((elem, index)=> {
          let added = this.props.post.added && index == 0;

          return <PostDetail
              key={elem.id}
              post={elem}
              tags={this.props.tags}
              logged={this.props.logged}
              token={this.props.token}
              ratePost={this.props.postActions.ratePost}
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
        tagsAddBlock = tags.map((elem, index)=> {
          let key = elem.id;
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
            <div hidden={this.props.token}>

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

            <div hidden={this.props.token}>

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
    else return null;
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