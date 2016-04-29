import React, { PropTypes, Component } from 'react'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/Post'
import classNames from 'classnames'

export default class PostDetail extends Component {

    getRateBlock(post) {
        let key = post.id;
        let likeButtonInactive = !this.props.logged || post.user==this.props.userId || post.rating;
        let dislikeButtonInactive = !this.props.logged  || post.user==this.props.userId || post.rating;
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
                <div><a href={'#post/' + key}>{post.body}</a></div>
                </div>
               
                
                <div className="post_tags">
                <label>Метки:</label>
                <ul className="tags">
                    {
                        this.props.tags.map(function(tag) {
                            if (post.tags.indexOf(tag.id) >= 0) {
                                return <li className="tag_elem inline" key={tag.id}>{tag.title}</li>
                            }
                        })
                    }
                </ul>
                </div>
                <div className="post_comment_count"><a href={'#post/' + key}>Комментариев: {post.comment_count}</a></div>
            </div>


        )
    }

}
