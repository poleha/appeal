import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import * as userActions from '../../actions/UserActions'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as tagActions from '../../actions/TagActions'
import User from '../../components/User'
import { Link } from 'react-router'


export default class App extends Component {

    loadAjax() {
        if (!this.props.user.logged && !this.props.user.logging) {
            this.props.userActions.getUserInfo();
        }
        if (!this.props.tag.loaded && !this.props.tag.loading) {

            this.props.tagActions.loadTags();
        }
    }

    componentDidUpdate() {
        this.loadAjax();
    }


    componentDidMount() {
        this.loadAjax();
    }


  isReady() {
      return this.props.user.logged && this.props.tag.loaded;
  }

    render() {
        if (!this.isReady()) return null;

    let path = this.props.params.tag;
    let linksBlock = this.props.tag.tags.map(function (tag, index) {
      return <li><Link to={`/${tag.alias}`}>{tag.title}</Link></li>
    });


    return (
        <div className='container'>
          <User
              data={this.props.user}
              actions={this.props.userActions}
          />
          <ul className={classNames('nav', 'nav-pills')}>
              <li><Link to='/'>Все</Link></li>
            {linksBlock}
          </ul>
          {this.props.children}
        </div>
    )
  }
}


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



export default connect(mapStateToProps, mapDispatchToProps)(App)