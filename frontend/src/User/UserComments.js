import React from "react";
import { observer, inject } from "mobx-react";
import {Comment} from "../CurrentTopic/Comment";

@inject("userStore")
@observer
export default class UserComments extends React.Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        return comments.map((comment) => {
            return (
                <Comment
                    author_name={comment.author_name}
                    avatar_url={comment.avatar_url}
                    text={comment.text}
                    date={comment.date}
                />
            )
        })
    }

    componentDidMount() {
        if (!this.props.userStore.userComments) {
            this.props.userStore.loadUserComments();
        }
    }

    render() {
        if (this.props.userStore.userComments) {
            const renderedTopics = this.renderComments(this.props.userStore.userComments);
            return (
                <div>
                    { renderedTopics }
                </div>
            )
        } else {
            return (
                <h3>Loading...</h3>
            )
        }
    }
}