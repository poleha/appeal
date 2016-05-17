import React, { PropTypes, Component } from 'react'

export default class VKLogin extends Component {


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