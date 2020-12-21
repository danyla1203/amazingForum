import {observable} from "mobx";

export class ThreadStore {
    @observable threads = [];

    loadThreads() {
        fetch(`${process.env.API_HOST}/threads`)
            .then(( response ) => {
                return response.json();
            })
            .then((threads) => {
                this.threads = threads
            })
    }
}