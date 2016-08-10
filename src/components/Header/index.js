import React, { PropTypes, Component } from 'react'
import Auth from '../../components/Auth'

export default class Header extends Component {

    render() {
        return (

            <header className="head">
                <div className="logo"><p><a href="/"><img src="/static/images/logo.png" width="201" height="62" alt=""/></a></p></div>
                <div className="head_right">
                    {/*
                    <div className="head_search">
                        <form action="/">
                            <input type="submit" value=""/>
                                <div className="input"><input type="text" placeholder="Поиск" required/></div>
                        </form>
                    </div>
                    */}

                    <div className="head_auth">

                        <Auth
                            data={this.props.auth}
                            actions={this.props.authActions}
                        />


                        
                    </div>

                </div>
            </header>
        )

    }

}