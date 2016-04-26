import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

export default class Post extends Component {

    componentDidMount() {
        let id = this.props.path.split('/')[1];
        this.props.actions.loadPost(id);
        this.props.actions.loadComments({post: id});
    }

    addCommentFormSubmit(e) {
        e.preventDefault();
        let username = ReactDOM.findDOMNode(this.refs.add_comment_username).value;
        let body = ReactDOM.findDOMNode(this.refs.add_comment_body).value;

        let comment = { username, body, post: this.props.data.id };
        this.props.actions.addComment(comment);
    }

    loadMoreCommentsClick(e) {

        this.props.actions.loadComments({post: this.props.data.id, limit: this.props.data.comments.length + 10} )

    }

    refreshCommentsClick(e) {
        this.props.actions.loadPost(this.props.data.id);
        this.props.actions.loadComments({post: this.props.data.id} )

    }

    render() {
      let post = this.props.data.post;
      let comments = this.props.data.comments;
        let commentsBlock;
        if (comments.length > 0) {
            commentsBlock = comments.map((elem, index)=>{
                let key =  elem.id;
                return <div key={key}>
                    <div>{elem.username}</div>

                    <div>{elem.body}</div>

                </div>
            });
        }


      return (
        <div>
            <label>Добавить комментарий</label>
            <form
                onSubmit={this.addCommentFormSubmit.bind(this)}
                className="add_comment_form"
            >
            <input
                ref="add_comment_username"
                className="add_comment_username"
                placeholder="Автор"
                type="text"
            />

            <textarea cols="70" rows="10"
        ref="add_comment_body"
        className="add_comment_body"
        placeholder="Комментарий"
        />

        <input
            type="submit"
            className="btn btn-default"
            value="Добавить"
        />
                </form>


            <div>
                {post.title}
            </div>
            <div>
                {post.body}
            </div>
            Комменты:
            <input
                onClick={this.refreshCommentsClick.bind(this)}
                type="button"
                className="btn btn-default"
                value="Обновить"
            />
            {commentsBlock}
            <input
                hidden={post.comments.length <= this.props.data.comments.length}
                onClick={this.loadMoreCommentsClick.bind(this)}
                type="button"
                className="btn btn-default"
                value="Показать еще"
            />

        </div>
      )


    }
}

