import {observable} from "mobx/lib/mobx";

export class CurrentTopicStore {
    @observable selected_topic = null;

    loadSelectedTopic(topic_id) {
        fetch(`${process.env.API_HOST}/topic/${topic_id}`)
            .then((response) => {
                return response.json();
            })
            .then((topic) => {
                this.selected_topic = topic;
            })
    }
}