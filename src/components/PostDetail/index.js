import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/Post'


export default class PostDetail extends Component {

    getRateBlock(post) {
        let key = post.id;
        let rateBlock;
        if (this.props.logged && !post.rated) {
            rateBlock = (
                <div>
                    <input
                        disabled={post.rating}
                        onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_LIKE)}
                        type="button"
                        className="btn btn-success"
                        value="Нравится"
                    />
                    <input
                        disabled={post.rating}
                        onClick={this.ratePostClick.bind(this, key, RATE_POST_TYPE_DISLIKE)}
                        type="button"
                        className="btn btn-danger"
                        value="Не нравится"
                    />
                </div>
            )
        }
        return rateBlock;
    }

    ratePostClick(key, actionType){
        this.props.ratePost(key, actionType)
    }

    render() {
        let post = this.props.post;
        let key =  post.id;
        return (
            <div className="post">
                <label>Автор:</label>
                <div>{post.username}</div>

                <label>Призыв:</label>
                <div><a href={'#post/' + key}>{post.body}</a></div>

                <label>Опубликовано:</label>
                <div>{post.created}</div>

                <label>Нравится:</label>
                <div>{post.liked}</div>

                <label>Не нравится:</label>
                <div>{post.disliked}</div>

                <div><a href={'#post/' + key}>Комментариев: {post.comment_count}</a></div>

                <label>Метки:</label>
                <ul className="tags">
                    {
                        this.props.tags.map(function(tag) {
                            if (post.tags.indexOf(tag.id) >= 0) {
                                return <li className="tag_elem" key={tag.id}>{tag.title}</li>
                            }
                        })
                    }
                </ul>
                {this.getRateBlock.call(this, post)}
            </div>


        )
    }

}
