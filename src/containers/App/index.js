import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import Helmet from 'react-helmet';
import classNames from 'classnames'
import * as userActions from '../../actions/UserActions'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as tagActions from '../../actions/TagActions'
import User from '../../components/User'
//import { Link } from 'react-router'
import NavLink from '../../components/NavLink'
import { mapNodes } from '../../helper'
import { getUserInfo } from '../../actions/UserActions'
import { loadTags } from '../../actions/TagActions'
import config from '../../config'


//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
    return {
        user: state.user,
        post: state.post,
        comment: state.comment,
        tag: state.tag
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        postActions: bindActionCreators(postActions, dispatch),
        commentActions: bindActionCreators(commentActions, dispatch),
        tagActions: bindActionCreators(tagActions, dispatch)
        //we bind Action Creator to dispatch http://redux.js.org/docs/Glossary.html#action-creator
        //this created action is immediately dispatched
        //Вместо этого мы можем передавать store во все компоненты, начиная с App, при нажатии на кнопку генерировать
        //action и this.props.store.dispatch(action);
    }
}


@asyncConnect([{
    promise: (params) => {
        let store = params.store
        let state = store.getState();
        let promises = []
        if (!state.user.logged) {
        promises.push(store.dispatch(getUserInfo()))
        }
        if (!state.tag.loaded) {
        promises.push(store.dispatch(loadTags()))
        }
        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    /*
    constructor(props) {
        super(props);
        this.state = {
            loginFormActive: false
        }
    }
*/

    /*
    loginClick(e) {
        e.preventDefault();
        this.setState({
            loginFormActive: !this.state.loginFormActive
        });
    }
    
    */

    getLoginBlock() {
        //if (this.state.loginFormActive) {
            //return (
            //    <User
            //        data={this.props.user}
             //       actions={this.props.userActions}
              //  />
            //)
        //}
         // else return null

    }

    render() {

      let linksBlock = mapNodes(this.props.tag.tags, function (tag) {
      return <NavLink key={tag.id} activeClassName='active' to={`/${tag.alias}`}>{tag.title}</NavLink>
    });

    return (
        <div className='container'>
            <Helmet {...config.app.head} title={config.app.title}/>
            {this.getLoginBlock()}
          <div className="top_block">
            <ul className={classNames('nav', 'nav-pills', 'top_menu')}>
              <NavLink activeClassName='active' onlyActiveOnIndex={true} to='/'>Все</NavLink>
            {linksBlock}
                <User
                    data={this.props.user}
                    actions={this.props.userActions}
                />
          </ul>
          </div>
          {this.props.children}
         </div>
    )
  }
}




