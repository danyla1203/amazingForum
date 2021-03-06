import React from "react";
import { observer, inject } from "mobx-react";
import { Thread } from "./Thread";
import "./Thread.sass"

@inject("threadStore")
@observer
export default class ThreadContainer extends React.Component {
    componentDidMount() {
        if (this.props.threadStore.threads.length < 1) {
            this.props.threadStore.loadThreads();
        }
    }

    renderThreads(threads) {
        if (!threads) {
            return (
                <h3>Nothing to render</h3>
            )
        }
        return threads.map((thread) => {
            return (
                <Thread
                    key={thread.thread_id}
                    name={thread.name}
                    thread_id={thread.thread_id}
                    topics_count={thread.count}
                />
            )
        })
    }

    render() {
        let threads = this.renderThreads(this.props.threadStore.threads);
        return (
            <div id="thread_container">
                { threads }
            </div>
        )
    }
}