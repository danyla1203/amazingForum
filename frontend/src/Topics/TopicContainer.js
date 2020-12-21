import React from "react";
import { observer, inject } from "mobx-react";
import {Topic} from "./ShortTopic";

@inject("topicStore")
@observer
export default class TopicContainer extends React.Component {
    componentDidMount() {
        let { thread_id } = this.props.match.params;
        if (this.props.topicStore.topics.length < 1) {
            this.prop.topicStore.loadTopicsPreview(thread_id);
        }
    }
    render() {
        let topics = this.props.topicStore.topics.map((topic) => {
            return <TopicShort/>
        });
        return (
            <div>
                { topics }
            </div>
        )
    }
}