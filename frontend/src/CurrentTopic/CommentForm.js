import React from "react"

export function CommentForm(props) {
    const submitComment = () => {
        let form = document.getElementById("comment_form");
        let formData = new FormData(form);
        props.submitComment(formData);
    };
    return (
        <form id="comment_form">
            <textarea name="text" cols="30" rows="10"></textarea>
            <button type="button" onClick={submitComment}>Comment</button>
        </form>
    )
}