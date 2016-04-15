import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Post from '../components/Post'
import * as postActions from '../actions/PostActions'

class App extends Component {
  render() {

    return <div>
      <Post data={this.props.post} actions={this.props.postActions} />
    </div>
  }
}

//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
  return {
    post: state.post
  }
}



function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch)
    //we bind Action Creator to dispatch http://redux.js.org/docs/Glossary.html#action-creator
    //this created action is immediately dispatched
    //Вместо этого мы можем передавать store во все компоненты, начиная с App, при нажатии на кнопку генерировать
    //action и this.props.store.dispatch(action);
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
