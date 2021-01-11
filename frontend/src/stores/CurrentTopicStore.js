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

    addComment(topic_id, commentFormData) {
        let commentForInsert = {
            id: this.comments[this.comments.length - 1].id,
            text: commentFormData.get("text"),
            date: "2003.12.03"
        };
        this.comments.push(commentForInsert);
        
        fetch(`${process.env.API_HOST}/topic/${topic_id}/add-comment`, { method: "POST", body: commentFormData })
            .then((response) => {
                return response.json();
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