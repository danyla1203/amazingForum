import {observable} from "mobx";

export class UserStore {
    @observable user = null;
    @observable errors = null;

    login(inputedData) {
        fetch(`${process.env.API_HOST}/login`, {method: "POST", body: inputedData})
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                if(user.status !== 200) {
                    this.errors = user.statusText;
                } else {
                    this.user = user.statusText;
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