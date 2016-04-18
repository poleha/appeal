import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

export default class User extends Component {
    loginUserClick() {
        let username = ReactDOM.findDOMNode(this.refs.username).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        this.props.actions.loginUser({username, password});
    }

    render() {

        let loginBlockTemplate = '';
        if (!this.props.data.logged) {
         loginBlockTemplate =
             <div>
                 <input
                     type="text"
                     ref="username"
                 />
                 <input
                     type="text"
                     ref="password"
                 />
                 <input
                     type="submit"
                     onClick={this.loginUserClick.bind(this)}
                 />
             </div>
        }
        else {
            loginBlockTemplate = <div>
                {this.props.data.userName}
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