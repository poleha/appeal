import React, { PropTypes, Component } from 'react'

export default class BaseComponent extends Component {
    
    getFieldErrors(fieldName){
        let fieldErrors = this.props.post.errors[fieldName];
        if (fieldErrors) {
            let errorsBlock;
            errorsBlock = fieldErrors.map(function (error, index) {
                return (
                    <li className="error" key={index}>
                        {error}
                    </li>
                )
            });
            return (
                <div className="errors">
                    <ul>
                        {errorsBlock}
                    </ul>
                </div>
            )
        }
    }

}