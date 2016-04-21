import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavLink from '../../components/NavLink'
import * as postActions from '../../actions/PostActions'
import * as userActions from '../../actions/UserActions'
import User from '../../components/User'
import Post from '../../components/Post'

export default class App extends Component {


  componentWillMount(){
    this.props.userActions.reLoginUser();
  }

  render() {


    return (
        <div className='container'>
          <User data={this.props.user} actions={this.props.userActions}/>
          <ul className='nav nav-pills'>
            <li><NavLink onlyActiveOnIndex={true} to='/'>Все</NavLink></li>
            <li><NavLink to='/ecology'>Экология</NavLink></li>
            <li><NavLink to='/politics'>Политика</NavLink></li>
          </ul>
          <Post
              data = {this.props.post}
              actions = {this.props.postActions}
              logged = {this.props.user.logged}
              userId = {this.props.user.userId}
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
    user: state.user
  }
}



function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
    //we bind Action Creator to dispatch http://redux.js.org/docs/Glossary.html#action-creator
    //this created action is immediately dispatched
    //Вместо этого мы можем передавать store во все компоненты, начиная с App, при нажатии на кнопку генерировать
    //action и this.props.store.dispatch(action);
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
