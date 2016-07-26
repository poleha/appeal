import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as commentActions from '../../actions/CommentActions'
import { CommentUpdateForm } from '../../components/CommentForm'
import NotAllowed from '../../components/NotAllowed'


function mapStateToProps(state) {
    return {
        comment: state.comment,
        //tags: state.tag.tags,
        logged: state.auth.logged,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        commentActions: bindActionCreators(commentActions, dispatch),
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
            return store.dispatch(commentActions.loadCommentPerm(id));
        });
        promises.push(currentPromise);

        return Promise.all(promises);
    }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class CommentUpdate extends BaseComponent {



    getComment() {
        if (this._comment == null) this._comment = this.props.comment.comments.entities[this.props.params.id];
        return this._comment;
    }

   


    render() {
        let comment = this.getComment();
        if (comment == null) return <NotAllowed />;
        return (
            <div>
                <Helmet title={comment.body.slice(0, 20) + '... | изменение'}/>
            <CommentUpdateForm {...this.props} />
            </div>    
        )

    }

}

