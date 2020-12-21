import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";

import stores from "./stores/index";
import { UserRouter } from "./UserRouter";

function App() {
    return (
        <Provider {...stores}>
            <UserRouter/>
        </Provider>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);