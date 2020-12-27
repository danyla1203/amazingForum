import React from "react"
import {Comment} from "./Comment";

export default class CommentsContainer extends React.Component {
    renderComments(comments) {
        return comments.map((comment) => {
            return (
                <Comment
                    text={comment.text}
                    date={comment.date}
                    author_name={comment.author_name}
                    avatar_url={comment.avatar_url}
                />
            )
        })
    }

    render() {
        let comments = this.renderComments(this.props.comments);
        return (
            <div id="comments">
                { comments }
            </div>
        )
    }
}