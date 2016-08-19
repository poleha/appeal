import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as accountActions from '../../actions/AccountActions'
import * as userActions from '../../actions/UserActions'
import { mapNodes } from '../../helpers/helper'
import { Link } from 'react-router'
import classNames from 'classnames'
import AccountSettings from '../../components/AccountSettings'


function mapStateToProps(state) {
    return {
        post: state.post,
        comment: state.comment,
        tags: state.tag.tags,
        logged: state.auth.logged,
        token: state.auth.token,
        auth: state.auth,
        user: state.user,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
   return {
       postActions: bindActionCreators(postActions, dispatch),
       commentActions: bindActionCreators(commentActions, dispatch),
       accountActions: bindActionCreators(accountActions, dispatch)
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
        this.state = {
            activeTab: 'appeals'
        }
    }


    componentDidMount() {
      this.props.commentActions.loadComments({user: this.props.params.id})
    }

    getPosts() {
        let posts = this.props.post.posts;
        let postsList = mapNodes(posts, (elem) => {
            return (
                <div className="item" key={elem.id}>
                    <ul>
                    <li className="date">{elem.created}</li>
                    <li className="item_name"><Link key={elem.id} activeClassName='active' to={`/post/${elem.id}`}>{elem.body}</Link></li>
                        <li className="icons">
                            <div className="icon icon_up">{elem.liked_count}</div>
                            <div className="icon icon_down">{elem.disliked_count}</div>
                            <div className="icon icon_comment">{elem.comment_count}</div>
                        </li>

                </ul>
                </div>
            )
        });
     return (
         <div className="list">
             {postsList}
        </div>
     )
    }

    getComments() {
        let comments = this.props.comment.comments;
        let commentsList = mapNodes(comments, (elem) => {
            return (
                <div className="item" key={elem.id}>
                    <p className="date2">{elem.created}</p>
                    <div className="notice content">
                        <p>
                            <Link key={elem.id} activeClassName='active' to={`/post/${elem.post}`}>{elem.body}</Link>
                        </p>
                    </div>
                    </div>
            )
        });
        return (
            <div className="list">
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
                <h1 className="lists_name">
                    Пользователь:
                    <strong>{user.username}</strong>
                </h1>
            )
        }
    }

    getShowMorePostsInput() {
        let posts = this.props.post.posts;

        if (posts.ids == null) return null;
        let showMoreInput;
        if (this.props.post.count > posts.ids.length) {
            showMoreInput = (
                <p className="text-center">
                <a
                    onClick={this.loadMorePostsClick.bind(this)}
                    className='button button_middle button_height'

                >
                    Показать еще
                </a>
                 </p>
            )
        }
        return showMoreInput;
    }

    loadMorePostsClick(e) {
        let userId = this.props.params.id;
        this.props.postActions.loadPosts({limit: this.props.post.posts.ids.length + 10, user: userId })

    }

    getShowMoreCommentsButton() {
        let comments = this.props.comment.comments
        if (!comments || comments.ids == null || comments.ids.length == 0) return null;
        let user = this.getUser();
        return (
            <p className="text-center">
            <a
                key="comment_show_more_button"
                onClick={this.loadMoreCommentsClick.bind(this)}
                className='button button_middle button_height'

            >
                Показать еще
                </a>
                </p>
        )

    }

    loadMoreCommentsClick(e) {
        this.props.commentActions.loadComments({user: this.props.params.id, limit: this.props.comment.comments.ids.length + 10} )
    }


    tabOnClick(tabId, e) {
        let target = e.target;
        let i = $(target).attr("data-tab");
        //$(this).addClass("active");
        $(".tab_group").slideUp();
        $("[data-tab-group=" + i + "]").slideDown();

        if (tabId == 'comments') this.props.commentActions.loadComments({user: this.props.params.id});

        this.setState({
         activeTab: tabId
     })
    }

    
    hasPerms() {
       return this.props.auth.userId && this.getUser().id == this.props.auth.userId; 
    }



    getSettingsTab() {
        let hasPerms = this.hasPerms();
        if (hasPerms) {
            let user = this.getUser();
            return <li className={classNames({active: this.state.activeTab=='settings'})} data-tab="3" onClick={this.tabOnClick.bind(this, 'settings')}>Управление</li>
        }
        else return null
    }


    getSettings() {
        let hasPerms = this.hasPerms();
        if (hasPerms) {
            let user = this.getUser();
            return (
                <div className={classNames('tab_group', {active: this.state.activeTab=='settings'})} data-tab-group="3">
                    <AccountSettings auth={this.props.auth} account={this.props.account} accountActions={this.props.accountActions}/>
                </div>
            )
        }
        else return null
    }

    render() {
        let user = this.getUser();
        let username = user ? user.username : '';


      return (

          <section className="lists bg_grey">
            <Helmet title={username}/>

              {this.getUserInfoBlock()}
                <div className="tabs">
                  <ul>
                      <li className={classNames('col-sm-1', {active: this.state.activeTab=='appeals'})} data-tab="1" onClick={this.tabOnClick.bind(this, 'appeals')}>Предложения({user.posts.length})</li>
                      <li className={classNames({active: this.state.activeTab=='comments'})} data-tab="2" onClick={this.tabOnClick.bind(this, 'comments')}>Комментарии({user.comments.length})</li>
                      {this.getSettingsTab()}
                      
                  </ul>
                  </div>
              <div className="clear"></div>
                      <div className={classNames('tab_group', {active: this.state.activeTab=='appeals'})} data-tab-group="1">
                          {this.getPosts()}
                          { this.getShowMorePostsInput() }
                      </div>
                      <div className={classNames('tab_group', {active: this.state.activeTab=='comments'})} data-tab-group="2">
                          {this.getComments()}
                          { this.getShowMoreCommentsButton() }
                      </div>
              {this.getSettings()}



        </section>

      )


}

}