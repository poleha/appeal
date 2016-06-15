import React, { PropTypes, Component } from 'react'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/Post'
import classNames from 'classnames'
import { Link } from 'react-router'
import { mapNodes } from '../../helpers/helper'

export default class Post extends Component {

    getRateBlock(post) {
        let key = post.id;
        let likeButtonInactive = !this.props.userId || post.user==this.props.userId || post.rating;
        let dislikeButtonInactive = !this.props.userId  || post.user==this.props.userId || post.rating;
        let rateBlock;
            rateBlock = (
                <div className='rate_block'>
                    <input
                        disabled={likeButtonInactive}
                        onClick={this.ratePostClick.bind(this, RATE_POST_TYPE_LIKE)}
                        type="button"
                        className={classNames('button_like', {active: !likeButtonInactive}, {inactive: likeButtonInactive}, {rated:post.rated == RATE_POST_TYPE_LIKE})}
                        value={post.liked_count}
                    />
                    <input
                        disabled={dislikeButtonInactive}
                        onClick={this.ratePostClick.bind(this, RATE_POST_TYPE_DISLIKE)}
                        type="button"
                        className={classNames('button_dislike', {active: !dislikeButtonInactive}, {inactive: dislikeButtonInactive}, {rated:post.rated == RATE_POST_TYPE_DISLIKE})}
                        value={post.disliked_count}
                    />
                </div>
            );
        return rateBlock;
    }

    ratePostClick(actionType){
        this.props.ratePost({...this.props.post, rated: actionType})
    }

    render() {
        let post = this.props.post;
        let key =  post.id;
        return (
            <div className={classNames('post', {added: this.props.added})}>
                {this.getRateBlock.call(this, post)}
                <div className="post_created">{post.created}</div>
                <div className="post_author inline">
                <label>Автор:</label>
                <div className="inline">{post.username}</div>
                </div>

                <div className="post_body">
                <label>Призыв:</label>
                <div><Link to={'/post/' + key}>{post.body}</Link></div>
                </div>
               
                
                <div className="post_tags">
                <label>Метки:</label>
                <ul className="tags">
                    {
                        mapNodes(this.props.tags, function(tag) {
                            if (post.tags.indexOf(tag.id) >= 0) {
                                return <li className="tag_elem inline" key={tag.id}>{tag.title}</li>
                            }
                        })
                    }
                </ul>
                </div>
                <div className="post_comment_count"><Link to={'/post/' + key}>Комментариев: {post.comment_count}</Link></div>
            </div>


        )
    }

}
