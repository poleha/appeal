import React, { PropTypes, Component } from 'react'
import './styles.less'

//function onSignIn(currentUser) {
//console.log('22222222222222222')
//}

export default class GoogleLogin extends Component {




    componentDidMount() {
        let self = this;
        var startApp = function() {
            gapi.load('auth2', function(){
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                window.auth2 = gapi.auth2.init({
                    client_id: '652386564088-g829fhjk5jqdpuerod7qi2srp3tn42l4.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin'
                    // Request scopes in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                });
                
                //window.auth2.isSignedIn.listen(onSignIn);
                //attachSignin(document.getElementById('google_login_button'));
            });
        };


        /*
        function attachSignin(element) {
            auth2.attachClickHandler(element, {},
                self.onSignIn.bind(self));
        }
        */
        startApp();

      //  gapi.signin2.render('google_login_button', {
      //      'scope': 'https://www.googleapis.com/auth/plus.login',
      //      'onsuccess': this.onSignIn.bind(this)
      //  });

    }

    /*
    onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        
        let data = {
            id: profile.getId(),
            username: profile.getName(),
            network: 'google'
        };
    
        this.props.actions.GoogleLogin(data)
    }
    */
/*
        signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
*/
    render() {
        return (<div>
                <input type="button" value="google" onClick={this.props.actions.GoogleLogin.bind(this)} />
            </div>
        )
    }

}