import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import {Header} from "./Header";

export class UserRouter extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Router>

                </Router>
            </div>
        )
    }
}