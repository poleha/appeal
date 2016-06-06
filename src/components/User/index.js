import React, { PropTypes } from 'react'
import BaseComponent from '../BaseComponent'
import ReactDOM from 'react-dom'
import { USER_FORM_LOGIN, USER_FORM_REGISTRATION } from '../../constants/User'
import { formArrayToJson } from '../../helper'
import VKLogin from '../VKLogin'
import GoogleLogin from '../GoogleLogin'
import FacebookLogin from '../FacebookLogin'
import classNames from 'classnames'

export default class User extends BaseComponent {
    loginFormSubmit(e) {
        e.preventDefault();
        let loginForm = $(ReactDOM.findDOMNode(this._login_form));
        this.props.actions.loginUser(formArrayToJson(loginForm.serializeArray()));
    }
    registrationFormSubmit(e) {
        e.preventDefault();
        let registerForm = $(ReactDOM.findDOMNode(this._register_form));
        this.props.actions.registerUser(formArrayToJson(registerForm.serializeArray()));
    }


    getLoginBlockButtons() {
        let loginBlockButtons;
        if (!this.props.data.userId) {
            loginBlockButtons = <div className="login_block_buttons">
                <input
                    type="button"
                    value='Войти'
                    onClick={this.props.actions.activateForm.bind(this, USER_FORM_LOGIN)}
                    disabled={this.props.data.activeForm == USER_FORM_LOGIN }
                    className="btn btn-default"
                />
                <input
                    type="button"
                    value='Зарегистрироваться'
                    onClick={this.props.actions.activateForm.bind(this, USER_FORM_REGISTRATION)}
                    disabled={this.props.data.activeForm == USER_FORM_REGISTRATION }
                    className="btn btn-default"
                />
            </div>
        }
        return loginBlockButtons
    }

getLoginBlockTemplate () {


    let loginBlockTemplate;
    if (!this.props.data.userId) {

        if(this.props.data.activeForm == USER_FORM_LOGIN){
            loginBlockTemplate =
                <div className="login_block">
                    <div className="errors">
                        {this.getFieldErrors.call(this, 'non_field_errors','data', 'loginErrors')}
                    </div>
                    <form
                        onSubmit={this.loginFormSubmit.bind(this)}
                        className="login_form"
                        ref={(c) => this._login_form = c}
                    >
                        {this.getFieldErrors.call(this, 'username', 'data','loginErrors')}
                        <input
                            type="text"
                            ref={(c) => this._username = c}
                            placeholder="Имя пользователя"
                            className="user_username"
                            name="username"
                        />
                        {this.getFieldErrors.call(this, 'password', 'data','loginErrors')}
                        <input
                            type="text"
                            ref={(c) => this._password = c}
                            placeholder="Пароль"
                            name="password"
                            type="password"
                            className="user_password"
                        />
                        <input
                            type="submit"
                            value="Войти"
                            className="user_login btn btn-default"
                        />
                    </form>
                </div>
        }
        else if(this.props.data.activeForm == USER_FORM_REGISTRATION) {
            loginBlockTemplate =
                <div className="registration_block">
                    <form
                        className="registration_form"
                        onSubmit={this.registrationFormSubmit.bind(this)}
                        ref={(c) => this._register_form = c}
                    >
                        {this.getFieldErrors.call(this, 'non_field_errors', 'data','registerErrors')}
                        {this.getFieldErrors.call(this, 'email', 'data','registerErrors')}
                        <input
                            type="text"
                            ref={(c) => this._email = c}
                            className="user_email"
                            id="user_email"
                            name="email"
                            placeholder="E-mail"
                        />
                        {this.getFieldErrors.call(this, 'username', 'data','registerErrors')}
                        <input
                            type="text"
                            ref={(c) => this._username = c}
                            className="user_username"
                            id="user_username"
                            name="username"
                            placeholder="Имя пользователя"
                        />
                        {this.getFieldErrors.call(this,'password', 'data','registerErrors')}
                        <input
                            type="text"
                            ref={(c) => this._password = c}
                            className="user_password"
                            id="user_password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                        />
                        {this.getFieldErrors.call(this, 'password2', 'data','registerErrors')}
                        <input
                            type="text"
                            ref={(c) => this._password2 = c}
                            className="user_password2"
                            id="user_password2"
                            name="password2"
                            type="password"
                            placeholder="Пароль еще раз"
                        />
                        <input
                            type="submit"
                            className="user_submit btn btn-default"
                            value="Зарегистрироваться"
                        />
                    </form>
                </div>
        }


    }

    else {
        loginBlockTemplate =
            <div>
                <div className="logged_user"><label>Вы вошли как: </label>{this.props.data.userName}</div>
                <input
                    type="button"
                    value="Выйти"
                    className="user__logout btn btn-default"
                    onClick={this.props.actions.logoutUser.bind(this)}
                />
            </div>
    }
    return loginBlockTemplate;
}


    getSocialLoginTemplate () {

        let socialLoginTemplate = null;

        if (!this.props.data.userId) {


            socialLoginTemplate = (
                <div className={classNames('social_login_block', {hidden: this.props.data.userId})}>
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
        return ( <div
                key="user_block"
            >
                {this.getSocialLoginTemplate.call(this)}
                {this.getLoginBlockButtons.call(this)}
                {this.getLoginBlockTemplate.call(this)}

            </div>
        )
    }

    render() {
        return (
            <div className="user_block">
        {this.getUserBlock.call(this)}
                </div>
        )

    }
}

User.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}