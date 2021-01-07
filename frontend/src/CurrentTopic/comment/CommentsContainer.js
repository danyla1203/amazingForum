import React from "react"
import {Comment} from "./Comment";
import {CommentForm} from "./CommentForm";
import { observer, inject } from "mobx-react";
import "./CommentForm.sass"

@inject("currentTopicStore")
@observer
export default class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submitComment = this.submitComment.bind(this);
    }

    componentDidMount() {
        if(!this.props.currentTopicStore.comments < 1) {
            this.props.currentTopicStore.loadComments(this.props.topic_id);
        }
    }

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

    submitComment(formData) {
        this.props.currentTopicStore.addComment(this.props.topic_id, formData);
    }

    render() {
        let comments = this.renderComments(this.props.currentTopicStore.comments);
        return (
            <div id="comments">
                <CommentForm
                    submitComment={this.submitComment}
                />
                { comments }
            </div>
        )
    }
}