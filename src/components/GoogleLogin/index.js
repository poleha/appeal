import React, { PropTypes, Component } from 'react'

export default class GoogleLogin extends Component {
    componentDidMount() {
        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            window.auth2 = gapi.auth2.init({
                client_id: '652386564088-g829fhjk5jqdpuerod7qi2srp3tn42l4.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                //'fetch_basic_profile' : true
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });

        });
    }

    render() {
        return (
                <a
                    className='google_login_button'
                    onClick={this.props.actions.GoogleLogin.bind(this)}
                />
        )
    }

}