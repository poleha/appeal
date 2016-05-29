import React, { PropTypes, Component } from 'react'

export default class VKLogin extends Component {

    componentDidMount() {
        VK.init({
            apiId: 5414620
        });
    }

    render() {
    return (
        <input
            type="button"
            onClick={this.props.actions.VKLogin}
            defaultValue="VK"
        />

    )

    }

}