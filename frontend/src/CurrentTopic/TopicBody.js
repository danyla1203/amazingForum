import React from "react"
import { observer, inject } from "mobx-react";
import "./TopicBody.sass"

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
                    <div id="author_data">
                        <h3>{ topic.author_name }</h3>
                        <img src={topic.avatar_path} alt=""/>
                        <h4>{ topic.email }</h4>
                    </div>
                    <div id="post">
                        <h2>{ topic.title }</h2>
                        <p>{ topic.text }</p>
                        <h4>{ topic.date }</h4>
                    </div>
                </div>
            )
        } else {
            return <h3>Loading...</h3>
        }

    }
}