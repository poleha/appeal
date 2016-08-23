import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/AuthActions'


function mapStateToProps(state) {
    return {
        logged: state.auth.logged,
        token: state.auth.token,
        auth: state.auth,
        user: state.user,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
   return {
       authActions: bindActionCreators(authActions, dispatch)
   };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class VkLoginRedirect extends BaseComponent {

    componentDidMount() {
    let code = window.location.search.replace('?code=', '');
    this.props.authActions.VKLogin(code);  
    }



    render() {

      return (
          <section className="vk_login_redirect">
            <Helmet title="Авторизация VK"/>

        </section>

      )


}

}