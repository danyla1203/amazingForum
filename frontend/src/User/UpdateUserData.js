import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export default class UpdateUserData extends React.Component {

    constructor(props) {
        super(props);
        this.changeData = this.changeData.bind(this);
    }

    changeData() {
        let form = document.getElementById("update_user_form");
        let formData = new FormData(form);
        this.props.userStore.changeUserData(formData);
    }

    render() {
        if (this.props.userStore.user) {
            let errMessage = this.props.userStore.errors;
            return (
                <div>
                    <h3>{ errMessage }</h3>
                    <form id="update_user_form">
                        <input type="text" name="name"/>
                        <input type="password" name="password"/>
                        <hr/>
                        <input type="password" name="prev_password"/>
                        <button onClick={this.changeData} type="button">Change data</button>
                    </form>
                </div>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}