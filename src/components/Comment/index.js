import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'



export default class Comment extends Component {
    
    render() {
        let comment = this.props.comment;
        return <div className="comment">
            <label>Опубликован:</label><div>{comment.created}</div>
            <label>Автор:</label><div>{comment.username}</div>

            <label>Комментарий:</label><div>{comment.body}</div>

        </div>
    }
    
}