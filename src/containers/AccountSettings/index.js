import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  asyncConnect } from 'redux-async-connect'
import * as AccountActions from '../../actions/AccountActions'


function mapStateToProps(state) {
    return {
        auth: state.auth,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
   return {
       accountActions: bindActionCreators(AccountActions, dispatch),
   };
}

@asyncConnect([{
    promise: (params, helpers) => {
        let loginPromise;
        if (global.loginPromise) {
            loginPromise = global.loginPromise;
        }
        else {
            loginPromise = Promise.resolve();
        }

        return loginPromise;
    }
}])

@connect(mapStateToProps, mapDispatchToProps)
export default class AccountSettings extends BaseComponent {

    constructor(props) {
        super(props);
        let username = props.auth.userName;
        this.state = {
            username,
            password: "",
            newPassword1: "",
            newPassword2: "",
            activeDialog: null

        }
    }


    componentWillReceiveProps(nextProps) {
      if (!this.props.account.updated && nextProps.account.updated) {
          this.setState({activeDialog: null})
          $(this._changeUsernameModal).modal('hide');
          $(this._changePasswordModal).modal('hide');
      }

    }


    changeUsernameOnSubmit(e) {
     e.preventDefault();
        let body = {
            new_username: this.state.username,
            current_password: this.state.password
        }
     this.props.accountActions.changeUsername(body);
    }


    onChangeUsernameFormFieldChange(e) {
      let target = e.target;
      let name = target.getAttribute('name')
        if (name == 'username') {
            this.setState({username: target.value})
        }
        else if (name == 'password') {
            this.setState({password: target.value})
        }


    }


    changeUsernameOnClick(e) {
        e.preventDefault();
        this.setState({activeDialog: 'change_username'})
        $(this._changeUsernameModal).modal('show');
    }



    getChangeUsernameForm() {
        if (this.state.activeDialog == 'change_username') {
            return (
                <div>
                    <div className="errors">
                        {this.getFieldErrors('non_field_errors','account')}
                    </div>
                    <form onSubmit={this.changeUsernameOnSubmit.bind(this)}>
                        <div className="form_field">
                            {this.getFieldErrors('new_username', 'account')}
                            <input name="username" onChange={this.onChangeUsernameFormFieldChange.bind(this)} type="text" value={this.state.username}/>
                        </div>
                        <div className="form_field">
                            {this.getFieldErrors('current_password', 'account')}
                            <input name="password" onChange={this.onChangeUsernameFormFieldChange.bind(this)} type="password" value={this.state.password}/>
                        </div>
                        <input type="submit" value="Сохранить"/>
                    </form>

                </div>
            )
        }
        else return null
    }


    changePasswordOnSubmit(e) {
        e.preventDefault();
        let body = {
            new_password: this.state.newPassword1,
            re_new_password: this.state.newPassword2,
            current_password: this.state.password

        }
        this.props.accountActions.changePassword(body);
    }


    changePasswordOnClick(e) {
        e.preventDefault();
        this.setState({activeDialog: 'change_password'})
        $(this._changePasswordModal).modal('show');
    }


    onChangePasswordFormFieldChange(e) {
        let target = e.target;
        let name = target.getAttribute('name')
        if (name == 'new_password') {
            this.setState({newPassword1: target.value})
        }
        else if (name == 're_new_password') {
            this.setState({newPassword2: target.value})
        }
        else if (name == 'current_password') {
            this.setState({password: target.value})
        }


    }

    getChangePasswordForm() {
        if (this.state.activeDialog == 'change_password') {
            return (
                <div>
                    <div className="errors">
                        {this.getFieldErrors('non_field_errors','account')}
                    </div>
                    <form onSubmit={this.changePasswordOnSubmit.bind(this)}>
                        <div className="form_field">
                            {this.getFieldErrors('new_password', 'account')}
                            <input name="new_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.newPassword1}/>
                        </div>
                        <div className="form_field">
                            {this.getFieldErrors('re_new_password', 'account')}
                            <input name="re_new_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.newPassword2}/>
                        </div>
                        <div className="form_field">
                            {this.getFieldErrors('current_password', 'account')}
                            <input name="current_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.password}/>
                        </div>
                        <input type="submit" value="Сохранить"/>
                    </form>

                </div>
            )
        }
        else return null
    }


    render() {
        let username = this.props.auth.userName

      return (

          <section className="user_settings">
            <Helmet title={username}/>
        <div>{username}</div>
        <a onClick={this.changeUsernameOnClick.bind(this)}>Изменить</a>
              <div className="modal fade" ref={(e) => this._changeUsernameModal = e}>
                  <div className="modal-content">
                  <div className="modal-dialog">
                      <div type="button" className="close" data-dismiss="modal" aria-hidden="true"></div>
                      <div className="in">

                          <div className="modal-body">
              {this.getChangeUsernameForm()}
                          </div>
                      </div>
                  </div>
                  </div>
              </div>


              <a onClick={this.changePasswordOnClick.bind(this)}>Изменить пароль</a>


              <div className="modal fade" ref={(e) => this._changePasswordModal = e}>
                  <div className="modal-content">
                      <div className="modal-dialog">
                          <div type="button" className="close" data-dismiss="modal" aria-hidden="true"></div>
                          <div className="in">

                              <div className="modal-body">
                                  {this.getChangePasswordForm()}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>


        </section>

      )


}

}