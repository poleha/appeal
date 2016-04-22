import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postListActions from '../../actions/PostListActions'
import * as userActions from '../../actions/UserActions'
import * as appActions from '../../actions/AppActions'
import User from '../../components/User'
import PostList from '../../components/PostList'
import './styles.less'

export default class App extends Component {


  componentWillMount(){
    this.props.userActions.reLoginUser();
  }

  componentDidMount() {
    this.props.appActions.loadTags();


    window.addEventListener('hashchange', () => {
      let path = window.location.hash.substr(1);
      this.props.appActions.changePath(path);
      this.props.postListActions.loadPosts(path);

      
    });
    let path = window.location.hash.substr(1);
    this.props.appActions.changePath(path);
    this.props.postListActions.loadPosts(path);
  }
  
  render() {
    let path = this.props.app.path;
    let linksBlock = this.props.app.tags.map(function (tag, index) {
      let className;
      if (tag.alias ==  path) {
        className = 'active';
      }
      else {
        className = 'inactive'
      }
      return (
          <li key={tag.id}>
          <a href={'/#' + tag.alias } className={className}>
            {tag.title}
          </a>
          </li>
      )
    });



    return (
        <div className='container'>
          <User
              data={this.props.user}
              actions={this.props.userActions}
          />
          <ul className='nav nav-pills'>
            <li><a href='/#'>Все</a></li>
            {linksBlock}
          </ul>
          <PostList
              data = {this.props.postList}
              tags = {this.props.app.tags}
              actions = {this.props.postListActions}
              logged = {this.props.user.logged}
              userId = {this.props.user.userId}
              path = {this.props.app.path}
          />
        </div>
    )
  }
}

//      <Post data={this.props.postList} actions={this.props.postListActions} />


//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
  return {
    postList: state.postList,
    user: state.user,
    app: state.app
  }
}



function mapDispatchToProps(dispatch) {
  return {
    postListActions: bindActionCreators(postListActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
    //we bind Action Creator to dispatch http://redux.js.org/docs/Glossary.html#action-creator
    //this created action is immediately dispatched
    //Вместо этого мы можем передавать store во все компоненты, начиная с App, при нажатии на кнопку генерировать
    //action и this.props.store.dispatch(action);
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
