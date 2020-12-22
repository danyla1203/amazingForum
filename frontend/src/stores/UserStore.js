import {observable} from "mobx";

export class UserStore {
    @observable user = null;
    @observable errors = null;

    createUser(userData) {
        fetch(`${process.env.API_HOST}/register`, {method: "POST", body: userData})
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                this.user = user;
            })
    }

    login(inputedData) {
        fetch(`${process.env.API_HOST}/login`, {method: "POST", body: inputedData})
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                if(user.statusCode !== 200) {
                    this.errors = user.statusText;
                } else {
                    this.user = user.payload;
                }
            })
    }

    logout() {
        fetch(`${process.env.API_HOST}/logout`)
            .then((response) => {
                this.user = null;
            })
    }
}