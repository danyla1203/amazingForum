import React from "react";
import { inject } from "mobx-react";

@inject("topicStore", "threadStore")
export class  CreateTopic extends React.Component {
    constructor() {
        super();
    }

    renderSelectTag(threads) {
        let optionsList = threads.map((thread) => {
            let id = thread.thread_id;
            return <option key={id} value={id}>{ thread.name }</option>;
        });
        return <select name="thread_id">{ optionsList }</select>
    }
    render() {
        let selectTag = this.renderSelectTag(this.props.threadStore.threads);

        const defaultText = this.props.text ? this.props.text : "";
        const defaultTitle = this.props.title ? this.props.title : "";
        console.log(defaultTitle, defaultText);

        return (
            <div id="creater">
                <form id="createTopic_form">
                    <input type="text" name="title" defaultValue={defaultTitle}/>
                    <textarea name="text" cols="30" rows="10" defaultValue={defaultText}></textarea>
                    { selectTag }
                    <button onClick={this.props.save} type="button">Create</button>
                </form>
                <div id="article_prev">
                
                </div>
            </div>
        )
    }
}