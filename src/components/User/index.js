import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { USER_FORM_LOGIN, USER_FORM_REGISTRATION } from '../../constants/User'

export default class User extends Component {
    loginFormSubmit(e) {
        e.preventDefault();
        let username = ReactDOM.findDOMNode(this.refs.username).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        this.props.actions.loginUser({username, password});
    }
    registrationFormSubmit(e) {
        e.preventDefault();
        let username = ReactDOM.findDOMNode(this.refs.username).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        let password2 = ReactDOM.findDOMNode(this.refs.password2).value;
        let email = ReactDOM.findDOMNode(this.refs.email).value;
        this.props.actions.registerUser({username, password, password2, email });
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
        let loginBlockButtonsTemplate = '';
        if (!this.props.data.logged) {
         if(this.props.data.activeForm == USER_FORM_LOGIN){
         loginBlockTemplate =
             <div>
                 <div className="errors">
                     {loginErrors}
                 </div>
                 <form onSubmit={this.loginFormSubmit.bind(this)} className="login_form">
                 <input
                     type="text"
                     ref="username"
                     placeholder="Имя пользователя"
                     className="user_username"
                 />
                 <input
                     type="text"
                     ref="password"
                     placeholder="Пароль"
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
                 <form className="registration_form" onSubmit={this.registrationFormSubmit.bind(this)}>
                     {this.getFieldErrors.call(this, 'non_field_errors')}
                     {this.getFieldErrors.call(this, 'email')}
                         <input
                             type="text"
                             ref="email"
                             className="user_email"
                             id="user_email"
                             placeholder="E-mail"
                         />
                         {this.getFieldErrors.call(this, 'username')}
                         <input
                             type="text"
                             ref="username"
                             className="user_username"
                             id="user_username"
                             placeholder="Имя пользователя"
                         />
                         {this.getFieldErrors.call(this, 'password')}
                         <input
                             type="text"
                             ref="password"
                             className="user_password"
                             id="user_password"
                             placeholder="Пароль"
                         />
                         {this.getFieldErrors.call(this, 'password2')}
                         <input
                             type="text"
                             ref="password2"
                             className="user_password2"
                             id="user_password2"
                             placeholder="Пароль еще раз"
                         />
                         <input
                             type="submit"
                             className="user_submit btn btn-default"
                             value="Зарегистрироваться"
                         />
                     </form>
         }

            loginBlockButtonsTemplate = <div>
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

        else {
            loginBlockTemplate =
                <div>
                <div>{this.props.data.userName}</div>
                    <div>
                    <input
                        type="button"
                        value="logout"
                        className="user__logout btn btn-default"
                        onClick={this.props.actions.logoutUser.bind(this)}
                    />
                    </div>
                </div>
        }


        return <div>
            {loginBlockTemplate}
            {loginBlockButtonsTemplate}
            </div>
    }
}

User.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}