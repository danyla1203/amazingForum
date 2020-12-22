import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import Header from "./Header";
import ThreadContainer from "./Thread/ThreadContainer";
import TopicContainer from "./Topics/TopicContainer";
import FullTopic from "./Topics/FullTopic";
import Login from "./Login/Login";
import {Registration} from "./Registration/Registration";

export class UserRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
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
                        exact path="/signin"
                        component={Registration}
                    />
                </Router>
            </div>
        )
    }
}