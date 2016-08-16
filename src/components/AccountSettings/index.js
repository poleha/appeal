import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'


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
                            <label htmlFor="username">Новое имя пользователя</label>
                            <input id="username" name="username" onChange={this.onChangeUsernameFormFieldChange.bind(this)} type="text" value={this.state.username}/>
                        </div>
                        <div className="form_field">
                            {this.getFieldErrors('current_password', 'account')}
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
            return (
                <div>
                    <div className="errors">
                        {this.getFieldErrors('non_field_errors','account')}
                    </div>
                    <form onSubmit={this.changePasswordOnSubmit.bind(this)}>
                        <div className="form_field">
                            {this.getFieldErrors('new_password', 'account')}
                            <label htmlFor="new_password">Новый пароль</label>
                            <input id="new_password" name="new_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.newPassword1}/>
                        </div>
                        <div className="form_field">
                            {this.getFieldErrors('re_new_password', 'account')}
                            <label htmlFor="re_new_password">Новый пароль еще раз</label>
                            <input id="re_new_password" name="re_new_password" onChange={this.onChangePasswordFormFieldChange.bind(this)} type="password" value={this.state.newPassword2}/>
                        </div>
                        <div className="form_field">
                            {this.getFieldErrors('current_password', 'account')}
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


           <label>Получать уведомления о комментариях по электронной почте<input checked={this.props.auth.receiveCommentsEmail} onChange={this.receiveCommentsEmail.bind(this)} type="checkbox"/></label>



        </section>

      )


}

}