import React from "react";
import {Redirect, Link} from "react-router-dom";
import { observer, inject } from "mobx-react";
import "./Login.sass"

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
            let errMessage = <h3 id="err_message">{this.props.userStore.errors}</h3>;
            return (
                <div id="login_container">
                    {errMessage}
                    <form id="login_form">
                        <input type="text" name="name"/>
                        <input type="password" name="password"/>
                        <button type="button" onClick={this.login}>Sign in</button>
                    </form>
                    <Link to="/signup">Orrr... Sign up</Link>
                </div>
            )

        } else {
            return <Redirect to="/" />
        }
    }
}