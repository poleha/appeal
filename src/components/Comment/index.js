import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'


export default class Comment extends Component {


    getUserBlock(component) {
        let userBlock;
        if (component.user) {
            userBlock = (
                <div className="inline"><Link to={'/user/' + component.user}>{component.username}</Link></div>
            )
        }
        else {
            userBlock = (
                <div className="inline">{component.username}</div>
            )
        }
        return userBlock
    }


    getUpdateBlock(comment) {
        if (comment.user && comment.user==this.props.userId) {
            return (
                <div className="inline"><Link to={'/comment/' + comment.id + '/update'}>Редактировать</Link></div>
            )
        }
        else {
            return null;
        }
    }

    render() {
        let comment = this.props.comment;
        return <div className={classNames('comment', {added:this.props.added})}>
            <div>
            {this.getUpdateBlock.call(this, comment)}
            </div>
            <label>Опубликован:</label><div>{comment.created}</div>
            <label>Автор:</label><div>
            {this.getUserBlock.call(this, comment)}
        </div>
            <label>Комментарий:</label><div>{comment.body}</div>

        </div>
    }
    
}