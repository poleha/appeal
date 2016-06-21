import React, { PropTypes } from 'react'
import BaseComponent from '../BaseComponent'
import ReactDOM from 'react-dom'
import { USER_FORM_LOGIN, USER_FORM_REGISTRATION } from '../../constants/User'
import { formArrayToJson } from '../../helpers/helper'
import VKLogin from '../VKLogin'
import GoogleLogin from '../GoogleLogin'
import FacebookLogin from '../FacebookLogin'
import classNames from 'classnames'
import { Link } from 'react-router'

export default class User extends BaseComponent {
    
    constructor(props) {
        super(props)
        this.state = {
            activeForm: USER_FORM_LOGIN
        }
    }
    
    
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



    //componentDidMount() {
       // $(this._modal).modal();

            //$(this._body).modal('show');

    //}


    handdleFormChangeClick(formType, e) {
        this.setState({
            activeForm: formType
        })
    }

    getLoginBlockButtons() {
        let loginBlockButtons = null;
        if (!this.props.data.userId) {
            loginBlockButtons = <div className="login_block_buttons">
                <input
                    type="button"
                    value='Вход'
                    onClick={this.handdleFormChangeClick.bind(this, USER_FORM_LOGIN)}
                    disabled={this.state.activeForm == USER_FORM_LOGIN }
                    className="btn btn-default"
                />
                <input
                    type="button"
                    value='Регистрация'
                    onClick={this.handdleFormChangeClick.bind(this, USER_FORM_REGISTRATION)}
                    disabled={this.state.activeForm == USER_FORM_REGISTRATION }
                    className="btn btn-default"
                />
            </div>
        }
        return loginBlockButtons
    }

getLoginBlockTemplate () {


    let loginBlockTemplate = null;
    if (!this.props.data.userId) {

        if(this.state.activeForm == USER_FORM_LOGIN){
            loginBlockTemplate = (
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
            )
        }
        else if(this.state.activeForm == USER_FORM_REGISTRATION) {
            loginBlockTemplate = (
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
            )
        }


    }


    return loginBlockTemplate;
}


    getLoggedBlockTemplate() {
        if (!this.props.data.userId) return null;
        return (
            <div key="logged_block" className="logged_block">
                <div className="logged_user">
                    <label>Вы вошли как: </label>
                    <Link activeClassName='active' to={`/user/${this.props.data.userId}`}>{this.props.data.userName}</Link>
                </div>
                <input
                    type="button"
                    value="Выйти"
                    className="user__logout btn btn-default"
                    onClick={this.props.actions.logoutUser.bind(this)}
                />
            </div>
        )
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

    showLoginBlock() {
        $(this._body).modal('show');
    }

    render() {
        if (this.props.data.userId) {
            if (this._body) $(this._body).modal('hide');
            return this.getLoggedBlockTemplate.call(this);
        }
        return (
            <div>
            <div key="modal_box" id="modal_box" className="modal fade" ref={(e) => this._body = e}>
                    <div className="modal-dialog">
                        <div className="modal-content user_block">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 className="modal-title">Войти на сайт</h4>
                            </div>
                            <div className="modal-body">
                                {this.getUserBlock.call(this)}
                            </div>
                        </div>
                    </div>

                </div>
                <div key="logged_block" className="logged_block">
                <input type="button" value="Войти" onClick={this.showLoginBlock.bind(this)}/>
                 </div>
                </div>
        )

    }
}

User.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}