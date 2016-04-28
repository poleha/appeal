import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import * as userActions from '../../actions/UserActions'
import * as appActions from '../../actions/AppActions'
import * as postActions from '../../actions/PostActions'
import User from '../../components/User'
import PostList from '../../components/PostList'
import Post from '../../components/Post'
import './styles.less'

export default class App extends Component {


  componentWillMount(){
    this.props.userActions.getUserInfo();
  }


  componentDidMount() {
    this.props.appActions.loadTags();


    window.addEventListener('hashchange', () => {
      let path = window.location.hash.substr(1);

      this.props.appActions.changePathStart(path);


      
    });
    let path = window.location.hash.substr(1);
    this.props.appActions.changePathStart(path);

  }

  getContent() {
    let componentName = this.props.app.componentName;
    switch (componentName) {
      case 'PostList':
            return  (
                <PostList
                    data = {this.props.post}
                    tags = {this.props.app.tags}
                    actions = {this.props.postActions}
                    logged = {this.props.user.logged}
                    userId = {this.props.user.userId}
                    path = {this.props.app.path}
                />
            );
      case 'Post':
            return (
                <Post
                    data = {this.props.post}
                    actions = {this.props.postActions}
                    path = {this.props.app.path}
                    tags = {this.props.app.tags}
                    logged = {this.props.user.logged}
                    ratePost = {this.props.postActions.ratePost}
                />
            )

    }
  }
  
  render() {
    let path = this.props.app.path;
    let linksBlock = this.props.app.tags.map(function (tag, index) {
      return (
          <li key={tag.id} className={classNames(
          {
              active: tag.alias ==  path
          })}>
          <a href={'/#' + tag.alias }>
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
          <ul className={classNames('nav', 'nav-pills')}>
            <li className={classNames({ active: path == '' })}><a href='/#'>Все</a></li>
            {linksBlock}
          </ul>
          {this.getContent()}
        </div>
    )
  }
}

//      <Post data={this.props.postList} actions={this.props.postListActions} />


//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
  return {
    user: state.user,
    app: state.app,
    post: state.post
  }
}



function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch)
    //we bind Action Creator to dispatch http://redux.js.org/docs/Glossary.html#action-creator
    //this created action is immediately dispatched
    //Вместо этого мы можем передавать store во все компоненты, начиная с App, при нажатии на кнопку генерировать
    //action и this.props.store.dispatch(action);
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
