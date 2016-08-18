import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../../actions/AccountActions'


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


    getPasswordResetDoneForm() {
        if (!this.props.account.updated) {
            return (
                <form onSubmit={this.changePasswordFormSubmit.bind(this)}>
                    {this.getFieldErrors('non_field_errors', 'account')}
                    <div className="form_field">
                        {this.getFieldErrors('new_password', 'account')}
                        <input type="password" value={this.state.password} placeholder="Введите новый пароль"
                               onChange={this.changePassword.bind(this)}/>
                    </div>
                    <input type="submit" value="Отправить" className="button button_left"/>
                </form>
            )
        }
        else return (
            <div>
                Пароль успешно установлен! Теперь Вы можете войти на сайт с помощью нового пароля.
            </div>
        )
    }

    render() {

      return (
          <section className="password_reset_done">
            <Helmet title="Подтверждение сброса пароля"/>
              {this.getPasswordResetDoneForm()}
        </section>

      )


}

}