import React from "react";
import { inject, observer } from "mobx-react";

@inject("currentTopicStore")
@observer
export default class FullTopic extends React.Component {
    componentDidMount() {
        let { topic_id } = this.props.match.params;
        if (!this.props.currentTopicStore.selected_topic) {
            this.props.currentTopicStore.loadSelectedTopic(topic_id);
        }
    }
    render() {
        return (
            <h1>Topic Page</h1>
        )
    }
}