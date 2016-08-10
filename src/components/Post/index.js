import React, { PropTypes, Component } from 'react'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/Post'
import classNames from 'classnames'
import { Link } from 'react-router'
import { mapNodes } from '../../helpers/helper'

export default class Post extends Component {

    getRateBlock(post) {
        //let key = post.id;
        let rateBlockDisabled = !this.props.userId || post.user==this.props.userId || post.rating;
        //let dislikeButtonInactive = !this.props.userId  || post.user==this.props.userId || post.rating;
        let rateBlock;
            rateBlock = (
                <li className={classNames('rate', {disable: rateBlockDisabled})}>
                    <div
                        onClick={this.ratePostClick.bind(this, RATE_POST_TYPE_LIKE)}
                        type="button"
                        className={classNames('up', {active:post.rated == RATE_POST_TYPE_LIKE})}

                    >
                        {post.liked_count}
                    </div>
                    <div
                        onClick={this.ratePostClick.bind(this, RATE_POST_TYPE_DISLIKE)}
                        type="button"
                        className={classNames('down', {active:post.rated == RATE_POST_TYPE_DISLIKE})}

                    >
                        {post.disliked_count}
                    </div>
                </li>
            );
        return rateBlock;
    }


    getUpdateBlock(post) {
        if (post.user && post.user==this.props.userId) {
         return (
             <Link to={'/post/' + post.id + '/update'}>Редактировать</Link>
         )
        }
        else {
            return null;
        }
    }

    ratePostClick(actionType){
        this.props.ratePost({...this.props.post, rated: actionType})
    }

    getUserBlock(component) {
        let userBlock;
        if (component.user) {
            userBlock = (
                <Link to={'/user/' + component.user}>{component.username}</Link>
            )
        }
        else {
            userBlock = (
                <span>{component.username}</span>
            )
        }
        return userBlock
    }

    render() {
        let post = this.props.post;
        let key =  post.id;
        return (
            <div className={classNames('card', {added: this.props.added})}>



                <div className="card_info">
                    <div className="info_left">
                        <div className="name"> {this.getUserBlock(post)}</div>
                        <span>{post.created}</span>
                    </div>
                    <div className="info_right">
                        <span>{this.getUpdateBlock(post)}</span>
                        <span><Link to={'/post/' + key}>Комментариев: {post.comment_count}</Link></span>
                    </div>
                </div>



                <ul className="card_table">
                <li>
                    <div className="content">
                        {post.body}
                    </div>
                </li>
                    {this.getRateBlock(post)}
                </ul>
               
                
                <div className="post_tags">
                <p>Метки:</p>
                <ul className="tags">
                    {
                        mapNodes(this.props.tags, function(tag) {
                            if (post.tags.indexOf(tag.id) >= 0) {
                                return (
                                    <li className="tag_elem inline" key={tag.id}>
                                        <Link to={`/${tag.alias}`}>{tag.title}</Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                </div>

            </div>


        )
    }

}
