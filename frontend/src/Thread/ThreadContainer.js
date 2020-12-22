import React from "react";
import { observer, inject } from "mobx-react";
import { Thread } from "./Thread";

@inject("threadStore")
@observer
export default class ThreadContainer extends React.Component {
    componentDidMount() {
        if (this.props.threadStore.threads.length < 1) {
            this.props.threadStore.loadThreads();
        }
    }

    renderThreads(threads) {
        return threads.map((thread) => {
            return (
                <Thread
                    key={thread.thread_id}
                    name={thread.name}
                    thread_id={thread.thread_id}
                />
            )
        })
    }

    render() {
        let threads = this.renderThreads(this.props.threadStore.threads);
        return (
            <div>
                { threads }
            </div>
        )
    }
}