import React from "react";
import TopicBody from "./TopicBody";
import CommentsContainer from "./comment/CommentsContainer";

export function FullTopic(props) {
    return (
        <div>
            <TopicBody topic_id={props.match.params.topic_id}/>
            <CommentsContainer topic_id={props.match.params.topic_id}/>
        </div>
    )
}
