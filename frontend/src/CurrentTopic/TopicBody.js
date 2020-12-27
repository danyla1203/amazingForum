import React from "react"

export default class TopicBody extends React.Component{
    render() {
        return (
            <div id="post_body">
                <h2>{ this.props.title }</h2>
                <p>{ this.props.text }</p>
                <h4>{ this.props.date }</h4>
            </div>
        )
    }
}