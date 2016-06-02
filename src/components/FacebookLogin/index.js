import React, { PropTypes, Component } from 'react'

export default class FacebookLogin extends Component {


    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '624947091005210',
                xfbml      : true,
                version    : 'v2.6'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/ru_RU/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }

    
    render() {
        return (
                <input
                    type="button"
                    className="facebook_login_button"
                    onClick={this.props.actions.FacebookLogin.bind(this)}
                />
        )
    }

}