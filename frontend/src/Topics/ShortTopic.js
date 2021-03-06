import React from "react";
import {Link} from "react-router-dom";

export function ShortTopic(props) {
    return (
        <div className="topic_item">
            <Link to={"/topic/" + props.topic_id}>
                <h3>{ props.title }</h3>
            </Link>
        </div>
    )
}