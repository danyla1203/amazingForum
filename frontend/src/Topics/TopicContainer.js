import React from "react";
import { observer, inject } from "mobx-react";
import {ShortTopic} from "./ShortTopic";
import "./Topics.sass"

@inject("topicStore")
@observer
export default class TopicContainer extends React.Component {
    componentDidMount() {
        let { thread_id } = this.props.match.params;
        this.props.topicStore.loadTopicsPreview(thread_id);
    }

    renderTopics(topics) {
        return topics.map((topic) => {
            return (
                <ShortTopic
                    key={topic.topic_id}
                    topic_id={topic.topic_id}
                    title={topic.title}
                />
            )
        });
    }

    render() {
        let topics = this.renderTopics(this.props.topicStore.topics);
        return (
            <div id="topic_container">
                { topics }
            </div>
        )
    }
}