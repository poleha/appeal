import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as userActions from '../../actions/UserActions'
import { mapNodes } from '../../helpers/helper'
import { Link } from 'react-router'
import classNames from 'classnames'


function mapStateToProps(state) {
    return {
        post: state.post,
        comment: state.comment,
        tags: state.tag.tags,
        logged: state.auth.logged,
        token: state.auth.token,
        auth: state.auth,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
   return {
       postActions: bindActionCreators(postActions, dispatch),
       commentActions: bindActionCreators(commentActions, dispatch)
   };
}

@asyncConnect([{
    promise: (params, helpers) => {
        let store = params.store;
        let userId = params.params.id;
        let loginPromise;
        if (global.loginPromise) {
            loginPromise = global.loginPromise;
        }
        else {
            loginPromise = Promise.resolve();
        }
        let currentPromise = loginPromise.then(function() {
            let promises = [];
            let prom1 = store.dispatch(postActions.loadPosts({user: userId}));
            let prom2 = store.dispatch(userActions.loadUsers({id: userId}));
            promises.push(prom1);
            promises.push(prom2);
            return Promise.all(promises);
        });

        let promises = [];
        promises.push(currentPromise);


        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class UserDetail extends BaseComponent {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
      this.props.commentActions.loadComments({user: this.props.params.id})
    }

    getPosts() {
        let posts = this.props.post.posts;
        let postsList = mapNodes(posts, (elem) => {
            return (
                <div className="row" key={elem.id}>
                    <div className="col col-xs-4 col-sm-3 col-lg-2">{elem.created}</div>
                    <div className="col col-xs-5 col-sm-6 col-lg-7"><Link key={elem.id} activeClassName='active' to={`/post/${elem.id}`}>{elem.body}</Link></div>
                    <div className="col col-xs-1">{elem.liked_count}</div>
                    <div className="col col-xs-1">{elem.disliked_count}</div>
                    <div className="col col-xs-1">{elem.comment_count}</div>
                   </div>
            )
        });
     return (
         <div className="tab_inner">
             {postsList}
        </div>
     )
    }

    getComments() {
        let comments = this.props.comment.comments;
        let commentsList = mapNodes(comments, (elem) => {
            return (
                <div className="row" key={elem.id}>
                    <div className="col col-xs-4 col-sm-3 col-lg-2">{elem.created}</div>
                    <div className="col col-xs-7"><Link key={elem.id} activeClassName='active' to={`/post/${elem.post}`}>{elem.body}</Link></div>
                    </div>
            )
        });
        return (
            <div className="tab_inner">
                {commentsList}
            </div>
        )
    }

    getUser() {
        if (this.props.user.users) {
            let userId = this.props.params.id;
            return this.props.user.users.entities[userId];
        }
    }

    getUserInfoBlock() {
        if (this.props.user.users) {
            let user = this.getUser();
            return (
                <div>
                    <label>Пользователь:</label>
                    {user.username}
                </div>
            )
        }
    }

    getShowMorePostsInput() {
        let posts = this.props.post.posts;

        if (posts.ids == null) return null;
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

    loadMorePostsClick(e) {
        let userId = this.props.params.id;
        this.props.postActions.loadPosts({limit: this.props.post.posts.ids.length + 10, user: userId })

    }

    getShowMoreCommentsButton() {
        if (this.props.comment.comments == null) return null;
        let user = this.getUser();
        return (
            <input
                key="comment_show_more_button"
                onClick={this.loadMoreCommentsClick.bind(this)}
                type="button"
                className={classNames('btn', 'btn-default', {hidden: user.comments.length <= this.props.comment.comments.ids.length})}
                value="Показать еще"
            />
        )

    }

    loadMoreCommentsClick(e) {

        this.props.commentActions.loadComments({user: this.props.params.id, limit: this.props.comment.comments.ids.length + 10} )

    }


    render() {
        let user = this.getUser();
        let username = user ? user.username : '';

      return (

          <div className="user_page">
            <Helmet title={username}/>

              {this.getUserInfoBlock()}
              <div>

                  <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#posts" aria-controls="posts" role="tab" data-toggle="tab">Предложения({user.posts.length})</a></li>
                      <li role="presentation"><a href="#comments" aria-controls="comments" role="tab" data-toggle="tab">Комментарии({user.comments.length})</a></li>
                  </ul>

                  <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="posts">
                          {this.getPosts()}
                          { this.getShowMorePostsInput() }
                      </div>
                      <div role="tabpanel" className="tab-pane" id="comments">
                          {this.getComments()}
                          { this.getShowMoreCommentsButton() }
                      </div>
                  </div>

              </div>



            

        </div>

      )


}

}