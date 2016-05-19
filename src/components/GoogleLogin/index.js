import React, { PropTypes, Component } from 'react'

export default class GoogleLogin extends Component {


    componentDidMount() {
        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn.bind(this)
        });

    }

    onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        
        let data = {
            id: profile.getId(),
            username: profile.getName(),
            network: 'google'
        };
        /*
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        */
        this.props.actions.GoogleLogin(data)
    }
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
            <div
                id="g-signin2"
            />
            </div>
        )
    }

}