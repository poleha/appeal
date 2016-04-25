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
                 <form onSubmit={this.loginFormSubmit.bind(this)}>
                 <input
                     type="text"
                     ref="username"
                     className="user__username"
                 />
                 <input
                     type="text"
                     ref="password"
                     className="user__password"
                 />
                 <input
                     type="submit"
                     className="user__login"
                 />
                </form>
                </div>
         }
            else if(this.props.data.activeForm == USER_FORM_REGISTRATION) {
             loginBlockTemplate =
                 <form className="registration_form" onSubmit={this.registrationFormSubmit.bind(this)}>
                     {this.getFieldErrors.call(this, 'non_field_errors')}
                     <label htmlFor="user_email">E-mail</label>
                     {this.getFieldErrors.call(this, 'email')}
                         <input
                             type="text"
                             ref="email"
                             className="user_email"
                             id="user_email"
                         />
                        <label htmlFor="user_username">Имя пользователя</label>
                         {this.getFieldErrors.call(this, 'username')}
                         <input
                             type="text"
                             ref="username"
                             className="user_username"
                             id="user_username"
                         />
                     <label htmlFor="user_password">Пароль</label>
                         {this.getFieldErrors.call(this, 'password')}
                         <input
                             type="text"
                             ref="password"
                             className="user_password"
                             id="user_password"
                         />
                     <label htmlFor="user_password2">Пароль еще раз</label>
                         {this.getFieldErrors.call(this, 'password2')}
                         <input
                             type="text"
                             ref="password2"
                             className="user_password2"
                             id="user_password2"
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
                    value='login'
                    onClick={this.props.actions.activateForm.bind(this, USER_FORM_LOGIN)}
                    disabled={this.props.data.activeForm == USER_FORM_LOGIN }
                    className="btn btn-default"
                />
                <input
                    type="button"
                    value='register'
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