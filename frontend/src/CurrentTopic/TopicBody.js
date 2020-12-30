import React from "react"
import { observer, inject } from "mobx-react";

@inject("currentTopicStore")
@observer
export default class TopicBody extends React.Component{
    componentDidMount() {
        if(!this.props.currentTopicStore.selected_topic) {
            this.props.currentTopicStore.loadSelectedTopic(this.props.topic_id);
        }
    }
    render() {
        const topic = this.props.currentTopicStore.selected_topic;
        if (topic) {
            return (
                <div id="post_body">
                    <h2>{ topic.title }</h2>
                    <p>{ topic.text }</p>
                    <h4>{ topic.date }</h4>
                </div>
            )
        } else {
            return <h3>Loading...</h3>
        }

    }
}