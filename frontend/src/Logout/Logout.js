import React from "react";
import {Redirect} from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore")
@observer
export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            isLogout: false
        }
    }

    logout() {
        this.props.userStore.logout();
        this.setState({isLogout: true});
    }

    render() {
        if (!this.props.userStore.user)  {
            return <Redirect to="/"/>
        }
        if (this.state.isLogout) {
            return <Redirect to="/"/>

        } else {
            return(
                <div>
                    <h3>Do you really want to logout?</h3>
                    <button onClick={this.logout}>Yeah, i'm sure</button>
                </div>
            )
        }

    }
}