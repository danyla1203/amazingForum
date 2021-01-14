import React from "react"
import "./Comment.sass";

export function Comment(props) {
    return (
        <div className="comment_item">
            <div className="additional_data">
                <h4>{ props.author_name }</h4>
                <img src={props.user_avatar} alt=""/>
                <h4>{ props.date }</h4>
            </div>
            <p>{ props.text }</p>
        </div>
    )
}