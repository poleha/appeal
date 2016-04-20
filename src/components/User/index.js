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
        this.props.actions.registerUser({username, password, email });
    }
    render() {

        let loginErrors;

        if (this.props.data.errors.length > 0) {
            loginErrors = this.props.data.errors.map(function (elem, index) {
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
                 <div>
                     <div className="errors">
                         {loginErrors}
                     </div>
                     <form onSubmit={this.registrationFormSubmit.bind(this)}>
                         <input
                             type="text"
                             ref="email"
                             className="user__email"
                         />
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
                             type="text"
                             ref="password2"
                             className="user__password2"
                         />
                         <input
                             type="submit"
                             className="user__login"
                         />
                     </form>
                 </div>
         }

            loginBlockButtonsTemplate = <div>
                <input type="button"
                       value='login'
                       onClick={this.props.actions.activateForm.bind(this, USER_FORM_LOGIN)}
                       disabled={this.props.data.activeForm == USER_FORM_LOGIN }
                />
                <input
                    type="button"
                    value='register'
                    onClick={this.props.actions.activateForm.bind(this, USER_FORM_REGISTRATION)}
                    disabled={this.props.data.activeForm == USER_FORM_REGISTRATION }
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
                        className="user__logout"
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

Comment.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}