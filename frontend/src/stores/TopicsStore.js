import {observable} from "mobx";

export class TopicsStore {
    @observable topics = [];

    loadTopicsPreview(thread_id) {
        fetch(`${process.env.API_HOST}/thread/${thread_id}`)
            .then((response) => {
                return response.json();
            })
            .then((topics) => {
                this.topics = topics.payload;
            })
    }
    
    createTopic(formDataTopic) {
        let lastTopic = this.topics[this.topics.length - 1];
        const topic = {
            id: lastTopic ? lastTopic.id + 1 : 0,
            title: formDataTopic.get("title"),
        };
        this.topics.push(topic);

        fetch(`${process.env.API_HOST}/topic/create`, {method: "POST", body: formDataTopic})
            .then((response) => {
                return response.json();
            })
            .then((topics) => {

            })
    }
}