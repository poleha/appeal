import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'


export default class Post extends Component {

    componentDidMount() {
        let id = this.props.path.split('/')[1];
        this.props.actions.loadPost(id);
    }

    render() {
      let post = this.props.data.post;

      return (
        <div>
            <div>
                {post.title}
            </div>
            <div>
                {post.body}
            </div>

        </div>
      )


    }
}

