import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        let form = document.getElementById("signup_form");
        let formData = new FormData(form);
        this.props.userStore.createUser(formData);
    }

    render() {
        if (!this.props.userStore.user) {
            return (
                <form id="signup_form">
                    <input type="text" name="name"/>
                    <input type="password" name="password"/>
                    <button type="button" onClick={this.signUp}>Sign up</button>
                </form>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}