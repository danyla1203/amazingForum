import React from "react";
import {Redirect} from "react-router-dom";

@inject("userStore")
@observer
export default class Login extends React.Component {
    login() {
        let form = document.getElementById("login_form");
        let formData = new FormData(form);
        this.props.userStore.login(formData)
    }

    render() {
        if (!this.props.userStore.user) {
            return (
                <form id="login_form">
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