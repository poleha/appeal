import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import * as accountActions from '../../actions/AccountActions'
import * as userActions from '../../actions/UserActions'
import { mapNodes } from '../../helpers/helper'
import { Link } from 'react-router'
import classNames from 'classnames'
import AccountSettings from '../../components/AccountSettings'


function mapStateToProps(state) {
    return {
        logged: state.auth.logged,
        token: state.auth.token,
        auth: state.auth,
        user: state.user,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
   return {
       accountActions: bindActionCreators(accountActions, dispatch)
   };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class PasswordResetConfirm extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            password: ""
        }
    }


    changePassword(e) {
        let password = e.target.value;
        this.setState({password})
    }

    changePasswordFormSubmit(e) {
        e.preventDefault();
        let token = this.props.params.token;
        let uid = this.props.params.uid;
        let new_password = this.state.password;
        let data = {token, uid, new_password}
        this.props.accountActions.passwordResetConfirm(data)
    }


    render() {

      return (

          <section className="lists bg_grey">
            <Helmet title="Подтверждение сброса пароля"/>
            <form onSubmit={this.changePasswordFormSubmit.bind(this)}>
             <input type="password" value={this.state.password} onChange={this.changePassword.bind(this)}/>
             <input type="submit" value="Отправить"/>
            </form>



        </section>

      )


}

}