import React from "react"

export function Comment(props) {
    return (
        <div>
            <h4>{ props.author_name }</h4>
            <img src={props.avatar_url} alt=""/>
            <p>{ props.text }</p>
            <h4>{ props.date }</h4>
        </div>
    )
}