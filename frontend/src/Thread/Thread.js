import React from "react"
import { Link } from "react-router-dom";

export function Thread(props) {
    return (
        <div>
            <Link to={"/thread/" + props.thread_id}>
                <h3>{ props.name }</h3>
            </Link>
        </div>
    )
}