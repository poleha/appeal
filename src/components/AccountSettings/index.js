import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import classNames from 'classnames'

export default class AccountSettings extends BaseComponent {

    constructor(props) {
        super(props);
        let username = props.auth.userName;
        this.state = {
            username,
            password: "",
            newPassword1: "",
            newPassword2: "",
            email: "",
            activeDialog: null

        }
    }


    componentWillReceiveProps(nextProps) {
      if (!this.props.account.updated && nextProps.account.updated) {
          this.setState({activeDialog: null})
          $(this._changeUsernameModal).modal('hide');
          $(this._changePasswordModal).modal('hide');
          $(this._setEmailModal).modal('hide');
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
            let non_field_errors = this.getFieldErrors('non_field_errors','account')
            let new_username_errors = this.getFieldErrors('new_username', 'account')
            let current_password_errors = this.getFieldErrors('current_password', 'account')
            return (
                <div>
                    <div className="errors">
                        {non_field_errors}
                    </div>
                    <form onSubmit={this.changeUsernameOnSubmit.bind(this)}>
                        <div className={classNames("form_field", {has_errors: new_username_errors})}>
                            {new_username_errors}
                            <label htmlFor="username">Новое имя пользователя</label>
                            <input id="username" name="username" onChange={this.onChangeUsernameFormFieldChange.bind(this)} type="text" value={this.state.username}/>
                        </div>
                        <div className={classNames("form_field", {has_errors: current_password_errors})}>
                            {current_password_errors}
                            <label htmlFor="password">Текущий пароль</label>
                            <input id="password" name="password" onChange={this.onChangeUsernameFormFieldChange.bind(this)} type="password" value={this.state.password}/>
                        </div>
                        <input type="submit" value="Сохранить"/>
                    </form>

                </div>
            )
        }
        else return null
    }



    setEmailOnSubmit(e) {
        e.preventDefault();
        let body = {
            userId: this.props.auth.userId,
            email: this.state.email,
            password: this.state.password
        }
        this.props.accountActions.setUserEmail(body);

    }

    onChangeEmailFormFieldChange(e) {

            this.setState({email: e.target.value})
        }





    setEmailOnClick(e) {
        e.preventDefault();
        this.setState({activeDialog: 'set_email'})
        $(this._setEmailModal).modal('show');
    }

    getSetEmailForm() {
        if (this.state.activeDialog == 'set_email') {
            let non_field_errors = this.getFieldErrors('non_field_errors','account')
            let email_errors = this.getFieldErrors('email', 'account')
            let password_errors = this.getFieldErrors('password', 'account')
            return (
                <div>
                    <div className="errors">
                        {non_field_errors}
                    </div>
                    <form onSubmit={this.setEmailOnSubmit.bind(this)}>
                        <div className={classNames("form_field", {has_errors: email_errors})}>
                            {email_errors}
                            <label htmlFor="email">E-MAIL</label>
                            <input id="email" name="email" onChange={this.onChangeEmailFormFieldChange.bind(this)} type="email" value={this.state.email}/>
                        </div>
                        <div className={classNames("form_field", {has_errors: password_errors})}>
                            {password_errors}
                            <label htmlFor="password">Текущий пароль</label>
                            <input id="password" name="password" onChange={this.onChangeUsernameFormFieldChange.bind(this)} type="password" value={this.state.password}/>
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
            let non_field_errors = this.getFieldErrors('non_field_errors','account')
            let new_password_errors = this.getFieldErrors('new_password', 'account')
            let re_new_password_errors = this.getFieldErrors('re_new_password', 'account')
            let current_password_errors = this.getFieldErrors('current_password', 'account')
            return (
                <div>
                    <div className="errors">
                        {non_field_errors}
                    </div>
                    <form onSubmit={this.changePasswordOnSubmit.bind(this)}>
                        <div className={classNames("form_field", {has_errors: new_password_errors})}>
                            {new_password_errors}
                            <label htmlFor="new_password">Новый пароль</label>
                            <input id="new_password" name="new_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.newPassword1}/>
                        </div>
                        <div className={classNames("form_field", {has_errors: re_new_password_errors})}>
                            {re_new_password_errors}
                            <label htmlFor="re_new_password">Новый пароль еще раз</label>
                            <input id="re_new_password" name="re_new_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.newPassword2}/>
                        </div>
                        <div className={classNames("form_field", {has_errors: current_password_errors})}>
                            {current_password_errors}
                            <label htmlFor="current_password">Текущий пароль</label>
                            <input id="current_password" name="current_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.password}/>
                        </div>
                        <input type="submit" value="Сохранить"/>
                    </form>

                </div>
            )
        }
        else return null
    }


    receiveCommentsEmail() {
        let data = {
            receive_comments_email: !this.props.auth.receiveCommentsEmail,
            userId: this.props.auth.userId
        }

        this.props.accountActions.saveProfile(data)

    }


    resendActivationMailLinkOnClick(e) {
        e.preventDefault();
        this.props.accountActions.sendUserActivationMail()
    }

    getResendActivationMailLink() {
        if (this.props.auth.email  && !this.props.auth.emailConfirmed) {
            if(!this.props.account.mailSent) {
            return (
            <a className="change" onClick={this.resendActivationMailLinkOnClick.bind(this)}>Выслать повторно письмо для активации учетной записи</a>
        )
            }
            else {
              return <div className="added_message">Письмо отправлено</div>
            }
        }
        else return null
    }


    getSetEmailBlock() {
        if (this.props.auth.email) return null;

        return (
            <div>
        <a className="change" onClick={this.setEmailOnClick.bind(this)}>Установить e-mail</a>


        <div className="modal fade account_settings_modal_form" ref={(e) => this._setEmailModal = e}>
    <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
            <div className="close" data-dismiss="modal" aria-hidden="true"></div>
            <div className="title"><h1>Установить e-mail</h1></div>
        </div>
        <div className="in">

            <div className="modal-body">
            {this.getSetEmailForm()}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    )
    }

    render() {

      return (

          <section className="user_settings">
        <a className="change" onClick={this.changeUsernameOnClick.bind(this)}>Изменить имя пользователя</a>
              <div className="modal fade account_settings_modal_form" ref={(e) => this._changeUsernameModal = e}>

                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                      <div className="close" data-dismiss="modal" aria-hidden="true"></div>
                              <div className="title"><h1>Изменить имя пользователя</h1></div>
                       </div>
                      <div className="in">

                          <div className="modal-body">
              {this.getChangeUsernameForm()}
                          </div>
                      </div>
                  </div>
                  </div>
              </div>

              <a className="change" onClick={this.changePasswordOnClick.bind(this)}>Изменить пароль</a>


              <div className="modal fade account_settings_modal_form" ref={(e) => this._changePasswordModal = e}>
                  <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <div className="close" data-dismiss="modal" aria-hidden="true"></div>
                          <div className="title"><h1>Изменить пароль</h1></div>
                         </div>
                          <div className="in">

                              <div className="modal-body">
                                  {this.getChangePasswordForm()}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>




              {this.getSetEmailBlock()}



              {this.getResendActivationMailLink()}
              
           <label>Получать уведомления о комментариях по электронной почте<input checked={this.props.auth.receiveCommentsEmail} onChange={this.receiveCommentsEmail.bind(this)} type="checkbox"/></label>



        </section>

      )


}

}