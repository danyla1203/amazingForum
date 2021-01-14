import React from "react"
import { Link } from "react-router-dom";
import "./Comment.sass";

export function Comment(props) {
    return (
        <div className="comment_item">
            <Link to={"/topic/" + props.topic_id}>
                <div className="additional_data">
                <h4>{ props.author_name }</h4>
                <img src={props.user_avatar} alt=""/>
                <h4>{ props.date }</h4>
                </div>
            </Link>
            <p>{ props.text }</p>
        </div>
    )
}