import {observable} from "mobx/lib/mobx";

export class CurrentTopicStore {
    @observable selected_topic = null;
    @observable comments = [];

    loadSelectedTopic(topic_id) {
        fetch(`${process.env.API_HOST}/topic/${topic_id}`)
            .then((response) => {
                return response.json();
            })
            .then((topic) => {
                if (topic.statusCode == 200) {
                    this.selected_topic = topic.payload;
                }
            })
    }

    addComment(topic_id, comment) {
        this.comments.push(comment);
        fetch(`${process.env.API_HOST}/topic/${topic_id}/add-comment`, { method: "POST", body: comment })
            .then((response) => {
                return response.json();
            })
            .then((topic) => {
                if (topic.statusCode == 200) {
                    this.selected_topic = topic.payload;
                }
            })
    }

    loadComments(topic_id) {
        fetch(`${process.env.API_HOST}/topic/${topic_id}/messages`)
            .then((response) => {
                return response.json();
            })
            .then((comments) => {
                if (comments.statusCode == 200) {
                    this.comments = comments.payload;
                }
            })
    }
}