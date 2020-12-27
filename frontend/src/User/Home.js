import React from "react";
import {Redirect, Link} from "react-router-dom";
import { observer, inject } from "mobx-react";
import "./User.sass"

@inject("userStore")
@observer
export default class Home extends React.Component{
    render() {
        let user = this.props.userStore.user;
        if (user) {
            return (
                <div id="user_container">
                    <img src={user.avatar_path} alt="Avatar"/>
                    <div id="user_info">
                        <h3>{ user.name }</h3>
                        <h4>{ user.email }</h4>
                        <h4>{ user.country }</h4>
                        <div>
                            <Link to="/change-profile">Change profile data</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/login" />
        }
    }
}