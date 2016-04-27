import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'



export default class Comment extends Component {
    
    render() {
        let comment = this.props.comment;
        return <div>
            <div>{comment.username}</div>

            <div>{comment.body}</div>

        </div>
    }
    
}