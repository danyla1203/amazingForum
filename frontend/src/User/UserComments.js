import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import {Comment} from "../CurrentTopic/comment/Comment";

@inject("userStore")
@observer
export default class UserComments extends React.Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        return comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <Comment
                        topic_id={comment.topic_id}
                        author_name={comment.author_name}
                        avatar_url={comment.avatar_url}
                        text={comment.text}
                        date={comment.date}
                    />
                    <Link to={"/topic/" + comment.topic_id}>Go to topic</Link>
                </div>
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