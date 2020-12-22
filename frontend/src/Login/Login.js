import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        let form = document.getElementById("login_form");
        let formData = new FormData(form);
        this.props.userStore.login(formData)
    }

    render() {
        if (!this.props.userStore.user) {
            let errMessage = <h3>{this.props.userStore.errors}</h3>;
            return (
                <form id="login_form">
                    {errMessage}
                    <input type="text" name="name"/>
                    <input type="password" name="password"/>
                    <button type="button" onClick={this.login}>Sign in</button>
                </form>
            )

        } else {
            return <Redirect to="/" />
        }
    }
}