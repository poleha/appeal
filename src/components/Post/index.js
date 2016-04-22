import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'


export default class Post extends Component {

    componentDidMount() {
        let id = this.props.path.split('/')[1];
        this.props.actions.loadPost(id);
        this.props.actions.loadComments(id);
    }

    addCommentClick() {
        let username = ReactDOM.findDOMNode(this.refs.add_comment_username).value;
        let body = ReactDOM.findDOMNode(this.refs.add_comment_body).value;

        let comment = { username, body, post: this.props.data.id };
        this.props.actions.addComment(comment);
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
            <input
                ref="add_comment_username"
                className="add_comment_username"
                type="text">
            </input>


            Комментарий
            <input
        ref="add_comment_body"
        className="add_comment_body"
        type="text">
        </input>

        <input
            onClick={this.addCommentClick.bind(this)}
            type="button"
            value="Добавить">
        </input>


            <div>
                {post.title}
            </div>
            <div>
                {post.body}
            </div>
            Комменты:
            {commentsBlock}

        </div>
      )


    }
}

