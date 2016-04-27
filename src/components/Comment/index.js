import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'


export default class Comment extends Component {
    
    render() {
        let comment = this.props.comment;
        return <div className={classNames('comment', {added:this.props.added})}>
            <label>Опубликован:</label><div>{comment.created}</div>
            <label>Автор:</label><div>{comment.username}</div>
            <label>Комментарий:</label><div>{comment.body}</div>

        </div>
    }
    
}