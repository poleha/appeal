import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import Helmet from 'react-helmet';
import classNames from 'classnames'
import * as authActions from '../../actions/AuthActions'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as tagActions from '../../actions/TagActions'
import User from '../../components/Auth'
import NavLink from '../../components/NavLink'
import { mapNodes } from '../../helpers/helper'
import { getUserInfo } from '../../actions/AuthActions'
import { loadTags } from '../../actions/TagActions'
import config from '../../config'


//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
    return {
        auth: state.auth,
        post: state.post,
        comment: state.comment,
        tag: state.tag
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
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
        if (!state.auth.logged) {
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

    render() {

      let linksBlock = mapNodes(this.props.tag.tags, function (tag) {
      return <NavLink key={tag.id} activeClassName='active' to={`/${tag.alias}`}>{tag.title}</NavLink>
    });

    return (
        <div className='container'>
            <Helmet {...config.app.head} title={config.app.title}/>
          <div className="row top_block">
              <nav className="navbar navbar-default">
                      <div className="navbar-header">
                          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-menu-navbar-collapse" aria-expanded="false">
                              <span className="sr-only">Показать меню</span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                          </button>
                      </div>
                      <div className="collapse navbar-collapse" id="top-menu-navbar-collapse">
                      <ul className={classNames('nav', 'navbar-nav', 'top_menu')}>
              <NavLink activeClassName='active' onlyActiveOnIndex={true} to='/'>Все</NavLink>
            {linksBlock}

          </ul>
                          </div>
                  </nav>
              <User
                  data={this.props.auth}
                  actions={this.props.authActions}
              />
          </div>
          {this.props.children}
         </div>
    )
  }
}




