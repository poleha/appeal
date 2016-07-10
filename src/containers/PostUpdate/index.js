import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import { PostUpdateForm } from '../../components/PostForm'


function mapStateToProps(state) {
    return {
        post: state.post,
        tags: state.tag.tags,
        logged: state.auth.logged,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(postActions, dispatch),
    };
}

@asyncConnect([{
    promise: (params, helpers) => {
        let store = params.store;
        let id = params.params.id;

        let loginPromise;
        if (global.loginPromise) {
            loginPromise = global.loginPromise;
        }
        else {
            loginPromise = Promise.resolve();
        }
        let promises = [];
        let currentPromise = loginPromise.then(() => {
            return store.dispatch(postActions.loadPostPerm(id))
        }).catch(() => {});


        promises.push(currentPromise);

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PostUpdate extends BaseComponent {



    getPost() {
        if (this._post == null) this._post = this.props.post.posts.entities[this.props.params.id];
        return this._post;
    }




    render() {
        let post = this.getPost()
        return (
            <div>
                <Helmet title={post.body.slice(0, 20) + '... | изменение'}/>
                <PostUpdateForm {...this.props} />
            </div>
        )

    }

}

