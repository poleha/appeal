import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

export default class User extends Component {
    loginUserClick() {
        let username = ReactDOM.findDOMNode(this.refs.username).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        this.props.actions.loginUser({username, password});
    }

    render() {

        let loginErrors;

        if (this.props.data.errors.length > 0) {
            loginErrors = this.props.data.errors.map(function (elem, index) {
            return <div className='error' id={index}>
                    {elem}
                </div>
            });
        }

        let loginBlockTemplate = '';
        if (!this.props.data.logged) {
         loginBlockTemplate =
             <div>
                 <div className="errors">
                     {loginErrors}
                 </div>
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
                     onClick={this.loginUserClick.bind(this)}
                     className="user__login"
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
            </div>
    }
}

Comment.propTypes = {
    //year: PropTypes.number.isRequired,
    //photos: PropTypes.array.isRequired,
    //setYear: PropTypes.func.isRequired
}