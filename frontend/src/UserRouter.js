import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Header from "./Header";
import ThreadContainer from "./Thread/ThreadContainer";
import TopicContainer from "./Topics/TopicContainer";
import { FullTopic } from "./CurrentTopic/FullTopic";
import Login from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {CreateTopic} from "./TopicCreater/CreateTopic";
import Home from "./User/Home";
import UserPage from "./User/UserPage";
import UpdateUserData from "./User/UpdateUserData";
import Logout from "./Logout/Logout";
import {DeleteTopic} from "./Topics/DeleteTopic";
import {NewTopic} from "./Topics/NewTopic";
import {UpdateTopic} from "./Topics/UpdateTopic";
import {Error404} from "./Error404";

export class UserRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <Switch>
                    <Route
                        exact path="/"
                        component={ThreadContainer}
                    />
                    <Route
                        exact path="/thread/:thread_id"
                        component={TopicContainer}
                    />
                    <Route
                        exact path="/topic/:topic_id"
                        component={FullTopic}
                    />
                    <Route
                        exact path="/login"
                        component={Login}
                    />
                    <Route
                        exact path="/signup"
                        component={Registration}
                    />
                    <Route
                        exact path="/new-topic"
                        component={NewTopic}
                    />
                    <Route
                        exact path="/home"
                        component={Home}
                    />
                    <Route
                        exact path="/user/:user_id"
                        component={UserPage}
                    />
                    <Route
                        exact path="/change-profile"
                        component={UpdateUserData}
                    />
                    <Route
                        exact path="/logout"
                        component={Logout}
                    />
                    <Route
                        exact path="/topic/delete/:topic_id"
                        component={DeleteTopic}
                    />
                    <Route
                        exact path="/topic/update/:topic_id"
                        component={UpdateTopic}
                    />
                    <Route
                        component={Error404}
                    />
                    </Switch>
                </Router>
            </div>
        )
    }
}