import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";
import "./Registration.sass"
import countries from "./countryList"

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
            let errMessage = <h3 id="err_message">{this.props.userStore.errors}</h3>;
            return (
                <div id="signup_container">
                    {errMessage}
                    <form id="signup_form">
                        <input type="text" name="name"/>
                        <input type="password" name="password"/>
                        <input type="text" name="email"/>
                        { countries }
                        <input type="file" name="user_avatar"/>
                        <button type="button" onClick={this.signUp}>Sign up</button>
                    </form>
                </div>

            )
        } else {
            return <Redirect to="/" />
        }
    }
}