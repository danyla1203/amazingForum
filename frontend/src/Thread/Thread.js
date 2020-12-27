import React from "react"
import { Link } from "react-router-dom";

export function Thread(props) {
    return (
        <div className="thread_item">
            <Link to={"/thread/" + props.thread_id}>
                <h3>{ props.name }</h3>
            </Link>
            <h4>Topic count: {props.topics_count}</h4>
        </div>
    )
}