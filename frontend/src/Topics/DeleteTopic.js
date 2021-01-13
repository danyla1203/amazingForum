import React from "react";
import { inject } from "mobx-react";

@inject("topicStore")
export class DeleteTopic extends React.Component {
    constructor() {
        super();
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    deleteTopic() {
        let input = document.getElementById("providedPassword_input");
        let password = input.value;
        let { topic_id } = this.props.match.params;
        this.props.topicStore.deleteTopic(topic_id, password);
    }

    render() {
        return (
            <div>
                <input id="providedPassword_input"/>
                <button onClick={this.deleteTopic}>Delete Topic</button>
            </div>
        )
    }
}