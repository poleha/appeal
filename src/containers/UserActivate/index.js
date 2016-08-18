import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../../actions/AccountActions'


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
       accountActions: bindActionCreators(accountActions, dispatch)
   };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class UserActivate extends BaseComponent {


    userActivateFormSubmit(e) {
        e.preventDefault();
        let token = this.props.params.token;
        let uid = this.props.params.uid;
        this.props.accountActions.userActivate({token, uid})
    }


    getPasswordResetDoneForm() {
        if (!this.props.account.updated) {
            return (
                <form onSubmit={this.userActivateFormSubmit.bind(this)}>
                    {this.getFieldErrors('non_field_errors', 'account')}
                    {this.getFieldErrors('detail', 'account')}
                    <input type="submit" value="Активировать" className="button button_left"/>
                </form>
            )
        }
        else return (
            <div>
                Учетная запись успешно активирована
            </div>
        )
    }

    render() {

      return (
          <section className="user_activat">
            <Helmet title="Активация учетной запипи"/>
              {this.getPasswordResetDoneForm()}
        </section>

      )


}

}