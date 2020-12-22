import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export class Registration extends React.Component {
    signIn() {
        let form = document.getElementById("signin_form");
        let formData = new FormData(form);
        this.props.userStore.createUser(formData)
    }

    render() {
        if (!this.props.userStore.user) {
            return (
                <form id="signin_form">
                    <input type="text" name="name"/>
                    <input type="password" name="password"/>
                    <button type="button" onClick={this.signIn}>Sign in</button>
                </form>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}