import React, { PropTypes } from 'react'
import BaseComponent from '../BaseComponent'
import { USER_FORM_LOGIN, USER_FORM_REGISTRATION, USER_FORM_PASSWORD_RESET } from '../../constants/Auth'
import { formArrayToJson } from '../../helpers/helper'
import VKLogin from '../VKLogin'
import GoogleLogin from '../GoogleLogin'
import FacebookLogin from '../FacebookLogin'
import classNames from 'classnames'
import { Link } from 'react-router'

export default class Auth extends BaseComponent {
    
    constructor(props) {
        super(props)
        this.state = {
            activeForm: USER_FORM_LOGIN
        }
    }
    
    
    loginFormSubmit(e) {
        e.preventDefault();
        let loginForm = $(this._login_form);
        this.props.actions.loginUser(formArrayToJson(loginForm.serializeArray()));
    }
    registrationFormSubmit(e) {
        e.preventDefault();
        let registerForm = $(this._register_form);
        this.props.actions.registerUser(formArrayToJson(registerForm.serializeArray()));
    }


    passwordResetFormSubmit(e) {
        e.preventDefault();
        let passwordResetForm = $(this._passwordResetForm);
        this.props.actions.passwordReset(formArrayToJson(passwordResetForm.serializeArray()));
    }
    
    
    
    handdleFormChangeClick(formType, e) {
        this.setState({
            activeForm: formType
        })
    }

    getLoginBlockButtons() {
        let loginBlockButtons = null;
        if (!this.props.data.userId) {
            if( this.state.activeForm == USER_FORM_REGISTRATION ) {
            loginBlockButtons = (
                <div className='login_block_buttons'>
                 <p className='reg'>
                    Уже есть учетная запись?
                <a
                    type='button'
                    onClick={this.handdleFormChangeClick.bind(this, USER_FORM_LOGIN)}
                    className='un'
                >
                Войти
                </a>
                </p>
                </div>
                )
            }
            else if( this.state.activeForm == USER_FORM_LOGIN ) {
                loginBlockButtons = (
                    <div className='login_block_buttons'>
                        <p className='reg'>
                 Нет учетной записи?
                <a
                    type='button'
                    onClick={this.handdleFormChangeClick.bind(this, USER_FORM_REGISTRATION)}
                    className='un'
                >
                 Зарегистрироваться
                    </a>
             </p>
                        <p className='reg'>
                            <a
                                type='button'
                                onClick={this.handdleFormChangeClick.bind(this, USER_FORM_PASSWORD_RESET)}
                                className='un'
                            >
                                Забыли пароль?
                            </a>
                            </p>
            </div>
                )
            }
            else if (this.state.activeForm == USER_FORM_PASSWORD_RESET) {
                loginBlockButtons = (
                    <div className='login_block_buttons'>
                        <p className='reg'>
                            Нет учетной записи?
                            <a
                                type='button'
                                onClick={this.handdleFormChangeClick.bind(this, USER_FORM_REGISTRATION)}
                                className='un'
                            >
                                Зарегистрироваться
                            </a>
                        </p>
                        <p className='reg'>
                            <a
                                type='button'
                                onClick={this.handdleFormChangeClick.bind(this, USER_FORM_LOGIN)}
                                className='un'
                            >
                                Вспомнили пароль?
                            </a>
                        </p>
                    </div>
                )
            }
        }
        return loginBlockButtons
    }


    getPasswordResetDoneMessage() {
        if (this.props.data.resettingPasswordDone) {
            return (
                <div className='password_reset_done_message'>
                  Письмо с инструкциями отправлено на указанный адрес.
                </div>
            )
        }
        else return null
    }


getLoginBlockTemplate () {


    let loginBlockTemplate = null;
    if (!this.props.data.userId) {

        if(this.state.activeForm == USER_FORM_LOGIN){

            let non_field_errors = this.getFieldErrors('non_field_errors','data', 'loginErrors')
            let username_errors = this.getFieldErrors('username', 'data','loginErrors')
            let password_errors = this.getFieldErrors('password', 'data','loginErrors')

            loginBlockTemplate = (
                <div className='login_block'>
                    <div className='errors'>
                        {non_field_errors}
                    </div>
                    <form
                        onSubmit={this.loginFormSubmit.bind(this)}
                        className='login_form'
                        ref={(c) => this._login_form = c}
                    >
                        <div className={classNames('form_field', {has_errors: username_errors})}>
                        {username_errors}
                        <input
                            type='text'
                            ref={(c) => this._username = c}
                            placeholder='Имя пользователя'
                            className='user_username'
                            name='username'
                            required
                        />
                         </div>
                        <div className={classNames('form_field', {has_errors: password_errors})}>
                        {password_errors}
                        <input
                            ref={(c) => this._password = c}
                            placeholder='Пароль'
                            name='password'
                            type='password'
                            className='user_password'
                            required
                        />
                        </div>






                        <div className='notice'>
                            <div className='form_field'>
                            <p>

                                <label>
                                <input id='save_me'
                                       type='checkbox'
                                       defaultChecked={true}
                                       ref={(c) => this._saveMe = c}
                                       name='save_me'
                                       className='save_me'
                                />
                                Запомнить меня
                                </label>

                            </p>
                            </div>
                        </div>




                        <input
                            type='submit'
                            value='Войти'
                            className='user_login btn btn-default'
                        />
                    </form>
                </div>
            )
        }
        else if(this.state.activeForm == USER_FORM_REGISTRATION) {

            let non_field_errors = this.getFieldErrors('non_field_errors', 'data','registerErrors')
            let email_errors = this.getFieldErrors('email', 'data','registerErrors')
            let username_errors = this.getFieldErrors('username', 'data','registerErrors')
            let password_errors = this.getFieldErrors('password', 'data','registerErrors')
            let password2_errors = this.getFieldErrors('password2', 'data','registerErrors')

            loginBlockTemplate = (
                <div className='registration_block'>
                    <form
                        className='registration_form'
                        onSubmit={this.registrationFormSubmit.bind(this)}
                        ref={(c) => this._register_form = c}
                    >
                        {non_field_errors}
                        <div className={classNames('form_field', {has_errors: email_errors})}>
                        {email_errors}
                        <input
                            type='text'
                            ref={(c) => this._email = c}
                            className='user_email'
                            id='user_email'
                            name='email'
                            placeholder='E-mail'
                            required
                        />
                            </div>
                        <div className={classNames('form_field', {has_errors: username_errors})}>
                        {username_errors}
                        <input
                            type='text'
                            ref={(c) => this._username = c}
                            className='user_username'
                            id='user_username'
                            name='username'
                            placeholder='Имя пользователя'
                            required
                        />
                            </div>
                        <div className={classNames('form_field', {has_errors: password_errors})}>
                        {password_errors}
                        <input
                            type='text'
                            ref={(c) => this._password = c}
                            className='user_password'
                            id='user_password'
                            name='password'
                            type='password'
                            placeholder='Пароль'
                            required
                        />
                            </div>
                        <div className={classNames('form_field', {has_errors: password2_errors})}>
                        {password2_errors}
                        <input
                            type='text'
                            ref={(c) => this._password2 = c}
                            className='user_password2'
                            id='user_password2'
                            name='password2'
                            type='password'
                            placeholder='Пароль еще раз'
                            required
                        />
                            </div>
                        <input
                            type='submit'
                            className='user_submit btn btn-default'
                            value='Зарегистрироваться'
                        />
                    </form>
                </div>
            )
        }


        else if(this.state.activeForm == USER_FORM_PASSWORD_RESET) {
            loginBlockTemplate = (
                <div className='password_reset_block'>
                    {this.getPasswordResetDoneMessage()}
                    <form
                        className='password_reset_form'
                        onSubmit={this.passwordResetFormSubmit.bind(this)}
                        ref={(c) => this._passwordResetForm = c}
                    >
                        {this.getFieldErrors('non_field_errors', 'data','passwordResetErrors')}
                        <div className='form_field'>
                            {this.getFieldErrors('email', 'data','passwordResetErrors')}
                            <input
                                type='email'
                                ref={(c) => this._email = c}
                                className='user_email'
                                id='user_email'
                                name='email'
                                placeholder='E-mail'
                                required
                            />
                        </div>

                        <input
                            type='submit'
                            className='user_submit btn btn-default'
                            value='Восстановить пароль'
                        />
                    </form>
                </div>
            )
        }







    }


    return loginBlockTemplate;
}


    getLoggedBlockTemplate() {
        if (!this.props.data.userId) return null;
        return (
            <div key='logged_block' className='logged_block'>


                <p className='name'>Вы вошли как: <strong><Link activeClassName='active' to={`/user/${this.props.data.userId}`}>{this.props.data.userName}</Link></strong></p>

                <input
                    type='button'
                    value='Выйти'
                    className='button button_small'
                    onClick={this.props.actions.logoutUser.bind(this)}
                />
            </div>
        )
    }


    getSocialLoginTemplate () {

        let socialLoginTemplate = null;

        if (!this.props.data.userId) {


            socialLoginTemplate = (
                <div className={classNames('social', {hidden: this.props.data.userId})}>
                    <VKLogin
                        actions={this.props.actions}
                    />
                    <GoogleLogin
                        actions={this.props.actions}
                    />
                    <FacebookLogin
                        actions={this.props.actions}
                    />
                </div>
            )
        }

        return socialLoginTemplate;
    }

    getUserBlock() {
        return (
            <div
                key='user_block'
            >


                {this.getLoginBlockTemplate()}
            <div className='bottom'>
                {this.getSocialLoginTemplate()}
            </div>
                {this.getLoginBlockButtons()}

            </div>
        )
    }

    showLoginBlock() {
        $(this._body).modal('show');
    }

    render() {
        if (this.props.data.userId) {
            if (this._body) $(this._body).modal('hide');
            return this.getLoggedBlockTemplate();
        }
        return (
            <div>
            <div key='modal_box' id='modal_box' className='modal fade' ref={(e) => this._body = e}>
                    <div className='modal-dialog'>
                        <div className='modal-content user_block'>
                            <div className='close' data-dismiss='modal' aria-hidden='true'></div>
                            <div className='in'>

                            <div className='modal-body'>
                                {this.getUserBlock()}
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div key='logged_block' className='logged_block'>
                <input disabled={this.props.disabled} className='button button_small' type='button' value='Войти' onClick={this.showLoginBlock.bind(this)}/>
                 </div>
                </div>
        )

    }
}

Auth.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}