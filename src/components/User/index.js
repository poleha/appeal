import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { USER_FORM_LOGIN, USER_FORM_REGISTRATION } from '../../constants/User'
import { formArrayToJson } from '../../helper'

export default class User extends Component {
    loginFormSubmit(e) {
        e.preventDefault();
        let loginForm = $(ReactDOM.findDOMNode(this.refs.login_form));
        this.props.actions.loginUser(formArrayToJson(loginForm.serializeArray()));
    }
    registrationFormSubmit(e) {
        e.preventDefault();
        let registerForm = $(ReactDOM.findDOMNode(this.refs.register_form));
        this.props.actions.registerUser(formArrayToJson(registerForm.serializeArray()));
    }

    getFieldErrors(fieldName){
        let fieldErrors = this.props.data.registerErrors[fieldName];
        if (fieldErrors) {
            let errorsBlock;
            errorsBlock = fieldErrors.map(function (error, index) {
                return (
                    <li key={index}>
                        {error}
                    </li>
                )
            });
            return (
                <ul>
                    {errorsBlock}
                </ul>
            )
        }
    }


    getLoginBlockButtons() {
        let loginBlockButtons;
        if (!this.props.data.logged) {
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

    render() {

        let loginErrors;

        if (this.props.data.loginErrors.length > 0) {
            loginErrors = this.props.data.loginErrors.map(function (elem, index) {
            return <div className='error' key={index}>
                    {elem}
                </div>
            });
        }

        let loginBlockTemplate = '';
        if (!this.props.data.logged) {
         if(this.props.data.activeForm == USER_FORM_LOGIN){
         loginBlockTemplate =
             <div className="login_block">
                 <div className="errors">
                     {loginErrors}
                 </div>
                 <form
                     onSubmit={this.loginFormSubmit.bind(this)}
                     className="login_form"
                     ref="login_form"
                 >
                 <input
                     type="text"
                     ref="username"
                     placeholder="Имя пользователя"
                     className="user_username"
                     name="username"
                 />
                 <input
                     type="text"
                     ref="password"
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
                     ref="register_form"
                 >
                     {this.getFieldErrors.call(this, 'non_field_errors')}
                     {this.getFieldErrors.call(this, 'email')}
                         <input
                             type="text"
                             ref="email"
                             className="user_email"
                             id="user_email"
                             name="email"
                             placeholder="E-mail"
                         />
                         {this.getFieldErrors.call(this, 'username')}
                         <input
                             type="text"
                             ref="username"
                             className="user_username"
                             id="user_username"
                             name="username"
                             placeholder="Имя пользователя"
                         />
                         {this.getFieldErrors.call(this, 'password')}
                         <input
                             type="text"
                             ref="password"
                             className="user_password"
                             id="user_password"
                             name="password"
                             type="password"
                             placeholder="Пароль"
                         />
                         {this.getFieldErrors.call(this, 'password2')}
                         <input
                             type="text"
                             ref="password2"
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


        return <div className="user_block">
            {this.getLoginBlockButtons.call(this)}
            {loginBlockTemplate}

            </div>
    }
}

User.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}