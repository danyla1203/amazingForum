import {observable} from "mobx";

export class TopicsStore {
    @observable topics = [];
    @observable selected_topic = null;

    async loadTopicsPreview(thread_id) {
        fetch(`${process.env.API_HOST}/thread/${thread_id}`)
            .then((response) => {
                return response.json();
            })
            .then((topics) => {
                this.topics = topics;
            })
    }

    async loadSelectedTopic(topic_id) {
        fetch(`${process.env.API_HOST}/topic/${topic_id}`)
            .then((response) => {
                return response.json();
            })
            .then((topic) => {
                this.selected_topic = topic;
            })
    }
}