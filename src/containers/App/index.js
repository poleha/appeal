import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavLink from '../../components/NavLink'
import * as postActions from '../../actions/PostActions'
import * as userActions from '../../actions/UserActions'
import User from '../../components/User'

export default class App extends Component {
  getChildren() {
    let componentName = this.props.routes[this.props.routes.length - 1].component.displayName;
    let clonnedComponent;
    if (componentName == 'Post') {
      clonnedComponent = React.cloneElement(
          this.props.children,
          {data: this.props.post, actions: this.props.postActions, logged: this.props.user.logged, userId: this.props.user.userId}
      )
    }
    else {
      clonnedComponent =  this.props.children;
    }
    return clonnedComponent;
  }

  componentWillMount(){
    this.props.userActions.reLoginUser();
  }

  render() {


    return (
        <div className='container'>
          <User data={this.props.user} actions={this.props.userActions}/>
          <ul className='nav nav-pills'>
            <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
            <li><NavLink to='/comment'>Комментарий(тест)</NavLink></li>
          </ul>
          {this.getChildren.bind(this)()}
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
