import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class BaseComponent extends Component {
    
    getFieldErrors(fieldName, dataName, propName = 'errors', ){
        let fieldErrors = this.props[dataName][propName][fieldName];
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
            <ReactCSSTransitionGroup
            transitionName="errors"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout = {1000}
            transitionLeaveTimeout={1}
            className='errors'
            component="div"
            >
                    <ul>
                        {errorsBlock}
                    </ul>
                </ReactCSSTransitionGroup>
            )
        }
    }

}