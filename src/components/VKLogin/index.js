import React, { PropTypes, Component } from 'react'
import config from '../../config'

export default class VKLogin extends Component {


    loginOnClick(e) {
        e.preventDefault();
        window.location = `https://oauth.vk.com/authorize?client_id=5414620display=page&redirect_uri=http://${config.domen}/vk_login_redirect&scope=email&response_type=code&v=5.53`
    }

    render() {
    return (
        <a
            className='vk_login_button'
            onClick={this.loginOnClick.bind(this)}
        />

    )

    }

}