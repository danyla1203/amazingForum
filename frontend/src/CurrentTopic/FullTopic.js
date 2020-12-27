import React from "react";
import { inject, observer } from "mobx-react";
import TopicBody from "./TopicBody";
import CommentsContainer from "./CommentsContainer";

@inject("currentTopicStore")
@observer
export default class FullTopic extends React.Component {
    componentDidMount() {
        let { topic_id } = this.props.match.params;
        if (!this.props.currentTopicStore.selected_topic) {
            this.props.currentTopicStore.loadSelectedTopic(topic_id)
        }
        if (!this.props.currentTopicStore.comments) {
            this.props.currentTopicStore.loadComments(topic_id)
        }
    }
    render() {
        const store = this.props.currentTopicStore;
        if (store.selected_topic) {
            return (
                <div>
                    <TopicBody post={store.selected_topic}/>
                    <CommentsContainer comments={store.comments}/>
                </div>
            )
        } else {
            return (
                <h3>Loading...</h3>
            )
        }
    }
}