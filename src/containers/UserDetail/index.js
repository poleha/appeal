import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as anotherUserActions from '../../actions/AnotherUserActions'
import { mapNodes } from '../../helpers/helper'
import { Link } from 'react-router'

function mapStateToProps(state) {
    return {
        post: state.post,
        comment: state.comment,
        tags: state.tag.tags,
        logged: state.user.logged,
        token: state.user.token,
        user: state.user,
        anotherUser: state.anotherUser
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
            let prom2 = store.dispatch(anotherUserActions.loadUsers({id: userId}));
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
                    <div className="col col-xs-2">{elem.created}</div>
                    <div className="col col-xs-7"><Link key={elem.id} activeClassName='active' to={`/post/${elem.id}`}>{elem.body}</Link></div>
                    <div className="col col-xs-1">{elem.disliked_count}</div>
                    <div className="col col-xs-1">{elem.disliked_count}</div>
                    <div className="col col-xs-1">{elem.comment_count}</div>
                   </div>
            )
        });
     return (
         <div>
             {postsList}
        </div>
     )
    }

    getComments() {
        let comments = this.props.comment.comments;
        let commentsList = mapNodes(comments, (elem) => {
            return (
                <div className="row" key={elem.id}>
                    <div className="col col-xs-2">{elem.created}</div>
                    <div className="col col-xs-7"><Link key={elem.id} activeClassName='active' to={`/post/${elem.post}`}>{elem.body}</Link></div>
                    </div>
            )
        });
        return (
            <div>
                {commentsList}
            </div>
        )
    }

    getUserInfo() {
        if (this.props.anotherUser.users) {
            let userId = this.props.params.id;
            let user = this.props.anotherUser.users.entities[userId];
            return (
                <div>
                    <label>Пользователь:</label>
                    {user.username}
                </div>
            )
        }
    }
    
    render() {
        let userId = this.props.params.id;

      return (

          <div className="user_page">
            <Helmet title='User page'/>

              {this.getUserInfo.call(this)}
              <div>

                  <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#posts" aria-controls="posts" role="tab" data-toggle="tab">Призывы</a></li>
                      <li role="presentation"><a href="#comments" aria-controls="comments" role="tab" data-toggle="tab">Комментарии</a></li>
                  </ul>

                  <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="posts">
                          {this.getPosts.call(this)}
                      </div>
                      <div role="tabpanel" className="tab-pane" id="comments">
                          {this.getComments.call(this)}
                      </div>
                  </div>

              </div>



            

        </div>

      )


}

}