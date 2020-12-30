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
                    topic_id={topic.id}
                    title={topic.title}
                />
            )
        })
    }

    componentDidMount() {
        if (!this.props.userStore.usetTopics) {
            this.props.userStore.loadUserTopics();
        }
    }

    render() {
        if (this.props.userStore.usetTopics) {
            const renderedTopics = this.renderShortTopics(this.props.userStore.usetTopics);
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