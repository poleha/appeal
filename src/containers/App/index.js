import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import classNames from 'classnames'
import * as userActions from '../../actions/UserActions'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as tagActions from '../../actions/TagActions'
import User from '../../components/User'
import { Link } from 'react-router'
import { mapNodes } from '../../helper'
import { getUserInfo } from '../../actions/UserActions'
import { loadTags } from '../../actions/TagActions'


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
    promise: (params, helpers) => {
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
    render() {

    let path = this.props.params.tag;
        let linksBlock = mapNodes(this.props.tag.tags, function (tag) {
      return <li key={tag.id}><Link activeClassName='active' to={`/${tag.alias}`}>{tag.title}</Link></li>
    });


    return (
        <div className='container'>
          <User
              data={this.props.user}
              actions={this.props.userActions}
          />
          <ul className={classNames('nav', 'nav-pills')}>
              <li><Link activeClassName='active' onlyActiveOnIndex={true} to='/'>Все</Link></li>
            {linksBlock}
          </ul>
          {this.props.children}
        </div>
    )
  }
}




