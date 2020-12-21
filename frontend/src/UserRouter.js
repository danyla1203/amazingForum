import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import Header from "./Header";
import ThreadContainer from "./Thread/ThreadContainer";

export class UserRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <Route
                        path="/"
                        component={ThreadContainer}
                    />
                </Router>
            </div>
        )
    }
}