import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../../actions/PostActions'
import * as userActions from '../../actions/UserActions'
import * as appActions from '../../actions/AppActions'
import User from '../../components/User'
import Post from '../../components/Post'

export default class App extends Component {


  componentWillMount(){
    this.props.userActions.reLoginUser();
  }

  componentDidMount() {
    this.props.appActions.loadTags();


    window.addEventListener('hashchange', () => {
      let path = window.location.hash.substr(1);
      this.props.appActions.changePath(path);
      this.props.postActions.loadPosts(path);

      
    });
    let path = window.location.hash.substr(1);
    this.props.appActions.changePath(path);
    this.props.postActions.loadPosts(path);
  }
  
  render() {

    return (
        <div className='container'>
          <User
              data={this.props.user}
              actions={this.props.userActions}
          />
          <ul className='nav nav-pills'>
            <li><a href='/#'>Все</a></li>
            <li><a href='/#ecology'>Экология</a></li>
            <li><a href='/#politics'>Политика</a></li>
          </ul>
          <Post
              data = {this.props.post}
              tags = {this.props.app.tags}
              actions = {this.props.postActions}
              logged = {this.props.user.logged}
              userId = {this.props.user.userId}
              path = {this.props.app.path}
          />
        </div>
    )
  }
}

//      <Post data={this.props.post} actions={this.props.postActions} />


//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
    app: state.app
  }
}



function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
    //we bind Action Creator to dispatch http://redux.js.org/docs/Glossary.html#action-creator
    //this created action is immediately dispatched
    //Вместо этого мы можем передавать store во все компоненты, начиная с App, при нажатии на кнопку генерировать
    //action и this.props.store.dispatch(action);
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
