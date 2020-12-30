import {observable} from "mobx";

export class UserStore {
    @observable user = {
        user_id: 0,
        name: "Bunga Ungovich",
        email: "bungaMail@gmail.com",
        country: "United States",
    };
    @observable errors = null;
    @observable userComments = null;
    @observable usetTopics = null;


    loadUserComments() {
        fetch(`${process.env.API_HOST}/user/:user_id/comments`, {method: "POST", body: userData})
            .then((response) => {
                return response.json()
            })
            .then((userComments) => {
                if (userComments.statusCode !== 200) {
                    this.errors = userComments.statusText;
                } else {
                    this.user = userComments.payload;
                }
            })
    }

    loadUserTopics() {
        fetch(`${process.env.API_HOST}/user/:user_id/topics`, {method: "POST", body: userData})
            .then((response) => {
                return response.json()
            })
            .then((userTopics) => {
                if (userTopics.statusCode !== 200) {
                    this.errors = userTopics.statusText;
                } else {
                    this.user = userTopics.payload;
                }
            })
    }

    createUser(userData) {
        fetch(`${process.env.API_HOST}/register`, {method: "POST", body: userData})
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                if (user.statusCode !== 200) {
                    this.errors = user.statusText;
                } else {
                    this.user = user.payload;
                }
            })
    }
    
    changeUserData(userData) {
        fetch(`${process.env.API_HOST}/user`, {method: "PUT", body: userData})
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                if (user.statusCode !== 200) {
                    this.user = user.payload
                } else {
                    this.errors = user.statusText;
                }
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