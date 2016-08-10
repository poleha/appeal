import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import { mapNodes } from '../../helpers/helper'
import Post from '../../components/Post'
import { PostCreateForm } from '../../components/PostForm'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/PostActions'
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const canUseDOM = ExecutionEnvironment.canUseDOM;

function mapStateToProps(state) {
  return {
    post: state.post,
    comment: state.comment,
    tags: state.tag.tags,
    logged: state.auth.logged,
    token: state.auth.token,
    userId: state.auth.userId
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
      let loginPromise;
      if (global.loginPromise) {
      loginPromise = global.loginPromise;
      }
      else {
          loginPromise = Promise.resolve();
      }
      let currentPromise = loginPromise.then(() => store.dispatch(postActions.loadPosts({tags__alias: tag})));
      let promises = [];
    promises.push(currentPromise);

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostList extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            searchPlaceholder: 'Поиск'
        }
    }



    getPathChanged(otherProps) {
        return this.props.params.tag != otherProps.params.tag;
    }

    componentWillReceiveProps(nextProps) {
       let pathChanged = this.getPathChanged(nextProps)
       if (pathChanged ) {
           this._query.value = null;

           if (this.state.bodyFocus) this.setState({bodyFocus:false});
       }
   }


  componentDidUpdate(prevProps){


      this.setPlaceHolder();
  }

    setPlaceHolder() {

        if (canUseDOM && window.innerWidth > 800) {
            let searchPlaceholder = `Поиск по разделу ${this.getCurrentTagTitle()}`;
            if (this.state.searchPlaceholder != searchPlaceholder) {
                this.setState({searchPlaceholder});
            }
        }

    }

    componentDidMount() {
        this.setPlaceHolder();
    }

    getCurrentTagTitle() {
        let currentTag;
        let self = this;
        this.props.tags.ids.forEach((tagId) => {
            if (self.props.tags.entities[tagId].alias == self.props.params.tag) currentTag = self.props.tags.entities[tagId];
        });
        return currentTag ? currentTag.title : 'Все'
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




    getShowMoreInput() {
        let posts = this.props.post.posts;
        if (posts.ids == null) return null;
        let showMoreInput;
        if (this.props.post.count > posts.ids.length) {
            showMoreInput = (
                <input
                    onClick={this.loadMorePostsClick.bind(this)}
                    className="button button_middle button_height"
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


    getAddedBlock() {
        if (this.props.post.added) {
            return <div className="added_message">
                Ваше предложение добавлено
            </div>
        }
    }

searchInputChange(e) {
    e.preventDefault();
    let body = this._query.value;
    this.props.postActions.loadPosts({tags__alias: this.props.params.tag, body})
    
}

getSearchInput() {
    let searchPlaceholder = this.state.searchPlaceholder;

    return (
        <div className="post_search">
        <input onChange={this.searchInputChange.bind(this)}
         type="text"
        defaultValue=""
         name="query"
         placeholder={searchPlaceholder}
         ref={(c) => this._query = c}
        />
        </div>    
    )
}


  render() {
      let tags = this.props.tags;
      let currentTagTitle;
      Object.getOwnPropertyNames(tags.entities).forEach(function(key) {
          let tag = tags.entities[key]
          if (tag.alias == this.props.params.tag) currentTagTitle = tag.title;
      }.bind(this))

      return <div className="post_list">
          <Helmet title={currentTagTitle} />



          <div className="add_post_form_block">
             

            <PostCreateForm {...this.props}/>
             
        </div>
          {this.getAddedBlock()}
          <div className="box_search">
              <div className="in">
              {this.getSearchInput()}
              </div>
              </div>
          <a
            onClick={this.refreshPostsClick.bind(this)}
            disabled={this.getAddPostButtonDisabled()}
            type="button"
            className="button button_left button_height button_reload button_reload_search"
         >
              Обновить
        </a>

          <section className="cards">
          <ReactCSSTransitionGroup
              transitionName="posts"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1}
              className='posts'
          >
            {this.getPostsBlock()}
              <p className="text-center">
              {this.getShowMoreInput()}
              </p>
          </ReactCSSTransitionGroup>
</section>

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