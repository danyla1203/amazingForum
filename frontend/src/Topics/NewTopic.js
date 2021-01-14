import React from "react";
import { inject } from "mobx-react";
import {CreateTopic} from "../TopicCreater/CreateTopic";
import { Redirect } from "react-router-dom";

@inject("userStore")
export class NewTopic extends React.Component {
    constructor() {
        super();
        this.createArticle = this.createArticle.bind(this);
        this.state = {
            isCreated: false
        }
    }

    createArticle() {
        let form = document.getElementById("createTopic_form");
        let formData = new FormData(form);
        this.props.userStore.createTopic(formData);

        this.setState({ isCreated: true });
    }
    render() {
        if (this.state.isCreated) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <CreateTopic
                    save={this.createArticle}
                />
            </div>
        )
    }
}