import React from 'react'
import BaseComponent from '../../components/BaseComponent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {  asyncConnect } from 'redux-async-connect'
import Helmet from 'react-helmet';
import * as authActions from '../../actions/AuthActions'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as tagActions from '../../actions/TagActions'
import NavLink from '../../components/NavLink'
import Header from '../../components/Header'
import { mapNodes } from '../../helpers/helper'
import { getUserInfo } from '../../actions/AuthActions'
import { loadTags } from '../../actions/TagActions'
import config from '../../config'
import BreadCrumbs  from '../../components/BreadCrumbs'
import classNames from 'classnames'

//Устанавливаем соответствие глобального state props каждого компонента
function mapStateToProps(state) {
    return {
        auth: state.auth,
        post: state.post,
        comment: state.comment,
        tag: state.tag,
        global: state.global
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
export default class App extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            menuCollaped: false
        }
    }


    getMenuBlock() {


        let linksBlock = mapNodes(this.props.tag.tags, (tag) => {
            return <NavLink disabled={!this.props.global.menuEnabled} key={tag.id} activeClassName='active' to={`/${tag.alias}`}>{tag.title}</NavLink>
        });

        return (
            <div className='row top_block'>
                <nav className={classNames('menu', {active: this.state.menuCollaped})}>
                    <div className='menu_collapse' onClick={this.menuCollapseClick.bind(this)}></div>
                    <ul>
                        <NavLink disabled={!this.props.global.menuEnabled} activeClassName='active' onlyActiveOnIndex={true} to='/'>Все</NavLink>
                        {linksBlock}

                    </ul>
                </nav>

            </div>
        )
    }

    menuCollapseClick() {
        this.setState({menuCollaped: !this.state.menuCollaped})
    }

    render() {



    return (
    <div>
    <div className='root to_mobile' ref={(c) => this._root = c}>
            <div className='max_width'>
            <Helmet {...config.app.head} title={config.app.title}/>
             <Header {...this.props} />
                {this.getMenuBlock()}
            <BreadCrumbs {...this.props}/>
            {this.props.children}
         </div>
         </div>
        <div className='max_width'>
            <footer className='footer to_mobile'>
            <p className='text-center'>Qblik.ru 2016</p>
        </footer>
        </div>
        </div>
    )
  }
}




