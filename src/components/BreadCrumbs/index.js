import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import config from '../../config'
import { prepareBody } from '../../helpers/helper'

export default class BreadCrumbs extends Component {


    prepareBody(text) {
       return prepareBody(text)
    }



    getBreadCrumbs() {
        let params = this.props.params
        let location = this.props.location
        let id = params.id;

        if (location.pathname == `/post/${id}` ) {

            let post = this.props.post.posts.entities[id];
            let firstTag = this.props.tag.tags.entities[post.tags[0]];
            return (
                <ol className='breadcrumb'>
                    <li>
                        <Link to={`/${firstTag.alias}`}>{firstTag.title}</Link>
                    </li>

                    <li className='active'>

                        {this.prepareBody(post.body, 20)}
                    </li>

                </ol>
            )


        }

        if (location.pathname == `/post/${id}/update` ) {

            let id = params.id;
            let post = this.props.post.posts.entities[id];
            if (post == null) return null;
            let firstTag = this.props.tag.tags.entities[post.tags[0]];
            return (
                <ol className='breadcrumb'>
                    <li>
                        <Link to={`/${firstTag.alias}`}>{firstTag.title}</Link>
                    </li>

                    <li>
                        <Link to={`/post/${post.id}`}>{this.prepareBody(post.body, 20)}</Link>
                    </li>
                    <li className='active'>
                        Редактировать
                        </li>

                </ol>
            )

        }


        if (location.pathname == `/comment/${id}/update` ) {
            let id = params.id;
            let comment = this.props.comment.comments.entities[id];
            if (comment == null) return null;
            let post = this.props.post.posts.entities[comment.post];
            let firstTag = this.props.tag.tags.entities[post.tags[0]];
            return (
                <ol className='breadcrumb'>
                    <li>
                        <Link to={`/${firstTag.alias}`}>{firstTag.title}</Link>
                    </li>

                    <li>
                        <Link to={`/post/${post.id}`}>{this.prepareBody(post.body, 20)}</Link>
                    </li>

                    <li>

                        {this.prepareBody(comment.body, 20)}
                    </li>
                    <li className='active'>

                        Редактировать
                    </li>

                </ol>
            )


        }


    }

render() {
    return (
        <div className='breadcrumbs'>
            {this.getBreadCrumbs()}
        </div>
    )
}


}





