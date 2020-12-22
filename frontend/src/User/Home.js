import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export default class Home {
    render() {
        if (this.props.userStore.user) {
            return (
                <div>User page</div>
            )
        } else {
            return <Redirect to="/login" />
        }
    }
}