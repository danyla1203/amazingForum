import React from "react";
import {Redirect, Link} from "react-router-dom";
import { observer, inject } from "mobx-react";
import "./User.sass"
import UserTopics from "./UserTopics";
import UserComments from "./UserComments";

@inject("userStore")
@observer
export default class Home extends React.Component{
    render() {
        let user = this.props.userStore.user;
        if (user) {
            return (
                <div>
                    <div id="user_container">
                        <img src={user.avatar_path} alt="Avatar"/>
                        <div id="user_info">
                            <h3>{ user.nickname }</h3>
                            <h4>{ user.email }</h4>
                            <h4>{ user.country }</h4>
                            <div>
                                <button><Link to="/change-profile">Change profile data</Link></button>
                                <button><Link to="/logout">Logout</Link></button>
                            </div>
                        </div>
                    </div>
                    <div id="activity">
                        <UserTopics />
                        <UserComments />
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/login" />
        }
    }
}