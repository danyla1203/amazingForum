import React from "react";
import { Redirect } from "react-router-dom";
import { inject } from "mobx-react";

@inject("topicStore", "threadStore")
export class  CreateTopic extends React.Component {
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
        this.props.topicStore.createTopic(formData);

        this.setState({ isCreated: true });
    }

    renderSelectTag(threads) {
        let optionsList = threads.map((thread) => {
            let id = thread.thread_id;
            return <option key={id} value={id}>{ thread.name }</option>;
        });
        return <select name="thread_id">{ optionsList }</select>
    }
    render() {
        if (this.state.isCreated) {
            return <Redirect to="/" />
        }

        let selectTag = this.renderSelectTag(this.props.threadStore.threads);
        return (
            <div id="creater">
                <form id="createTopic_form">
                    <input type="text" name="title"/>
                    <textarea name="text" cols="30" rows="10"></textarea>
                    { selectTag }
                    <button onClick={this.createArticle} type="button">Create</button>
                </form>
                <div id="article_prev">
                
                </div>
            </div>
        )
    }
}