import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export default class Home extends React.Component{
    render() {
        let user = this.props.userStore.user;
        if (user) {
            return (
                <div>
                    <h3>{ user.name }</h3>
                    <h4>{ user.email }</h4>
                    <h4>{ user.country }</h4>
                </div>
            )
        } else {
            return <Redirect to="/login" />
        }
    }
}