import React from "react";
import { observer, inject } from "mobx-react";
import "./User.sass"
import {ShortTopic} from "../Topics/ShortTopic";

@inject("userStore")
@observer
export default class UserTopics extends React.Component {
    constructor(props) {
        super(props);
    }

    renderShortTopics(topics) {
        return topics.map((topic) => {
            return (
                <ShortTopic
                    key={topic.topic_id}
                    topic_id={topic.topic_id}
                    title={topic.title}
                />
            )
        })
    }

    componentDidMount() {
        if (!this.props.userStore.userTopics) {
            this.props.userStore.loadUserTopics();
        }
    }

    render() {
        if (this.props.userStore.userTopics) {
            const renderedTopics = this.renderShortTopics(this.props.userStore.userTopics);
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