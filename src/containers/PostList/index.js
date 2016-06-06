import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'
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
    let store = params.store;
    let tag = params.params.tag;
    let promises = [];
    store.dispatch(postActions.cleanPosts());
    promises.push(store.dispatch(postActions.loadPosts({tags__alias: tag})));

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostList extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            bodyFocus: false
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

  componentDidUpdate(prevProps){

      let pathChanged = this.props.params.tag != prevProps.params.tag;
      if ( pathChanged ) {
          this._query.value = null;

          if (this.state.bodyFocus) this.setState({bodyFocus:false});
      }


    if (this.props.post.added || pathChanged){
      this._add_post_username.value = '';
      this._add_post_email.value = '';
      this._add_post_body.value = '';
        this.setDefaultTags();


    }

  }


    getCurrentTagTitle() {
        let currentTag;
        let self = this;
        this.props.tags.ids.forEach((tagId) => {
            if (self.props.tags.entities[tagId].alias == self.props.params.tag) currentTag = self.props.tags.entities[tagId];
        });
        return currentTag ? currentTag.title : 'Все'
    }

  getPost() {
      let postForm = $(this._add_post_form);
    
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
    let body = this._query.value;
    this.props.postActions.loadPosts({tags__alias: this.props.params.tag, limit: this.props.post.posts.ids.length + 10, body})

  }

  refreshPostsClick(e) {
    this.props.postActions.cleanPosts();
    this.props.postActions.loadPosts({tags__alias: this.props.params.tag})

  }



  getAddedBlock() {
    if (this.props.post.added) {
      return <div className="added_message">
        Ваш призыв добавлен
      </div>
    }
  }


    addPostBodyOnFocus(e) {
        if (e.type == 'focus') this.setState({bodyFocus:true});
        //else this.setState({bodyFocus:false});

    }

    getAddPostForm() {
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
            <form
                key="add_post_form"
                onSubmit={this.addPostSubmit.bind(this)}
                className="add_post_form"
                ref={(c) => this._add_post_form = c}
            >
                <div className="form_field" hidden={this.props.userId}>
                    {this.getFieldErrors.call(this, 'username', 'post')}


                    <input
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
                ref={(c) => this._add_post_body = c}
                className={classNames('add_post_body', {expanded: this.state.bodyFocus || (this._add_post_body && this._add_post_body.value.length > 0)})}
                id="add_post_body"
                onFocus={this.addPostBodyOnFocus.bind(this)}
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
                    value="Отправить">
                </input>
            </form>
        )
    }


    getShowMoreInput() {
        if (this.props.post.loading) return null;
        let posts = this.props.post.posts;
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
        return showMoreInput;
    }

    getPostsBlock() {
            if (this.props.post.loading && this.props.post.posts === null) return null;
            let posts = this.props.post.posts;
        let tags = this.props.tags;
            let postsBlock = mapNodes(posts, function(elem, index){
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

        return postsBlock;
    }


searchInputChange(e) {
    e.preventDefault();
    let body = this._query.value;
    this.props.postActions.loadPosts({tags__alias: this.props.params.tag, body})
    
}

getSearchInput() {
    return (
        <div className="post_search">
        <input onChange={this.searchInputChange.bind(this)}
         type="text"
        defaultValue=""
         name="query"
         placeholder={`Поиск по разделу ${this.getCurrentTagTitle()}`}
         ref={(c) => this._query = c}
        />
        </div>    
    )
}


  render() {

      let tags = this.props.tags;
      let posts = this.props.post.posts;
      //let addPost = this.props.actions.addPost;
      let currentTagTitle;
      Object.getOwnPropertyNames.call(this, tags.entities).forEach(function(key) {
          let tag = tags.entities[key]
          if (tag.alias == this.props.params.tag) currentTagTitle = tag.title;
      }.bind(this))

      return <div className="post_list">
          <Helmet title={currentTagTitle} />

        <div className="add_post_form_block">
          <h3>Опубликовать призыв</h3>

            {this.getAddPostForm.call(this)}
             
        </div>
        {this.getAddedBlock.call(this)}
          {this.getSearchInput.call(this)}
          <input
            onClick={this.refreshPostsClick.bind(this)}
            disabled={this.getAddPostButtonDisabled.call(this)}
            type="button"
            className="btn btn-default"
            value="Обновить">
        </input>

          <ReactCSSTransitionGroup
              transitionName="posts"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1}
              className='posts'
          >
            {this.getPostsBlock.call(this)}
              {this.getShowMoreInput.call(this)}
          </ReactCSSTransitionGroup>


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