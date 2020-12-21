import React from "react";
import {Thread} from "./Thread";
import { observer, inject } from "mobx-react";

@inject("threadStore")
@observer
export default class ThreadContainer extends React.Component {
    componentDidMount() {
        if (this.props.threadStore.threads.length < 1) {
            this.props.threadStore.loadThreads();
        }
    }
    render() {
        let threads = this.props.threadStore.threads.map((thread) => {
            return <Thread name={thread.name} />
        });
        return (
            <div>
                { threads }
            </div>
        )
    }
}