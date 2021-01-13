import React from "react";
import { inject, observer } from "mobx-react";
import {CreateTopic} from "../TopicCreater/CreateTopic";
import { Redirect } from "react-router-dom";

@inject("topicStore", "currentTopicStore")
@observer
export class UpdateTopic extends React.Component {
    constructor() {
        super();
        this.createArticle = this.createArticle.bind(this);
        this.state = {
            isUpdated: false
        }
    }

    componentDidMount() {
        const { topic_id } = this.props.match.params;
        this.props.currentTopicStore.loadSelectedTopic(topic_id);
    }

    createArticle() {
        let form = document.getElementById("createTopic_form");
        let formData = new FormData(form);
        const { topic_id } = this.props.match.params;
        this.props.topicStore.updateTopic(topic_id, formData);

        this.setState({ isUpdated: true });
    }
    render() {
        if (this.state.isUpdated) {
            return <Redirect to="/"/>
        }
        if (this.props.currentTopicStore.selected_topic) {
            let { text, title } = this.props.currentTopicStore.selected_topic;
            return (
                <div>
                    <CreateTopic
                        save={this.createArticle}
                        text={text}
                        title={title}
                    />
                </div>
            )
        } else {
            return <h3>Loading...</h3>
        }
    }
}