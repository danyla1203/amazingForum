import {observable} from "mobx";

export class TopicsStore {
    @observable topics = [];

    loadTopicsPreview(thread_id) {
        fetch(`${process.env.API_HOST}/thread/${thread_id}`)
            .then((response) => {
                return response.json();
            })
            .then((topics) => {
                this.topics = topics;
            })
    }
}