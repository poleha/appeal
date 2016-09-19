import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import { RATE_POST_TYPE_LIKE, RATE_POST_TYPE_DISLIKE } from '../../constants/Post'
import classNames from 'classnames'
import { Link } from 'react-router'
import { mapNodes } from '../../helpers/helper'
import { removeSmiley, prepareBody } from '../../helpers/helper'
import config from '../../config'

export default class Post extends BaseComponent {

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



    componentDidMount() {

        let myShare = this._yandex_share;
        let post = this.props.post;

        let share = Ya.share2(myShare, {
            content: {
                url: `http://qblik.ru/post/${post.id}`,
                title: prepareBody(post.body),
                description: removeSmiley(post.body),

            },
            theme: {
                counter: true,
                services: "vkontakte,facebook,odnoklassniki,gplus"
            }

        });

    }

    getShareBlock() {

        /*
        let post = this.props.post;
        let title = prepareBody(post.body)
        let body = removeSmiley(post.body)
        let url = `http://qblik.ru/post/${post.id}`
        return (
        <span 
            className="ya-share2 card_info_item"
            data-services="vkontakte,facebook,odnoklassniki,gplus" 
            data-counter=""
            data-title={title}
            data-description={body}
            data-url={url}
        >
            
        </span>
        )
         */

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
                        <span className="card_info_item">{this.getUpdateBlock(post)}</span>
                        <span className="card_info_item"><Link to={'/post/' + key}>Комментариев: {post.comment_count}</Link></span>
                        <span className="yandex-share-block" ref={(c) => this._yandex_share = c}/>
                    </div>
                </div>



                <ul className="card_table">
                <li>
                    <div className="content">
                        {this.processSmileyText(post.body)}
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
