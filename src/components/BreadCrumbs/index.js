import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'



export default class BreadCrumbs extends Component {


    getBreadCrumbs() {
        let params = this.props.params
        let location = this.props.location
        let id = params.id;

        if (location.pathname == `/post/${id}` ) {

            let post = this.props.post.posts.entities[id];
            let firstTag = this.props.tag.tags.entities[post.tags[0]];
            return (
                <ol className="breadcrumb">
                    <li>
                        <Link to={`/${firstTag.alias}`}>{firstTag.title}</Link>
                    </li>

                    <li className="active">

                        {post.body.slice(0, 20)}
                    </li>

                </ol>
            )


        }

        if (location.pathname == `/post/${id}/update` ) {

            let id = params.id;
            let post = this.props.post.posts.entities[id];
            let firstTag = this.props.tag.tags.entities[post.tags[0]];
            return (
                <ol className="breadcrumb">
                    <li>
                        <Link to={`/${firstTag.alias}`}>{firstTag.title}</Link>
                    </li>

                    <li>
                        <Link to={`/post/${post.id}`}>{post.body.slice(0, 20)}</Link>
                    </li>
                    <li className="active">
                        Редактировать
                        </li>

                </ol>
            )

        }


        if (location.pathname == `/comment/${id}/update` ) {
            let id = params.id;
            let comment = this.props.comment.comments.entities[id];
            let post = this.props.post.posts.entities[comment.post];
            let firstTag = this.props.tag.tags.entities[post.tags[0]];
            return (
                <ol className="breadcrumb">
                    <li>
                        <Link to={`/${firstTag.alias}`}>{firstTag.title}</Link>
                    </li>

                    <li>
                        <Link to={`/post/${post.id}`}>{post.body.slice(0, 20)}</Link>
                    </li>

                    <li>

                        {comment.body.slice(0, 20)}
                    </li>
                    <li className="active">

                        Редактировать
                    </li>

                </ol>
            )


        }


    }

render() {
    return (
        <div className="breadcrumbs">
            {this.getBreadCrumbs()}
        </div>
    )
}


}





