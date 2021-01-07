import React, { useState } from "react"

export function CommentForm(props) {
    const [isOpen, toogle] = useState(false);

    const submitComment = () => {
        let form = document.getElementById("comment_form");
        let formData = new FormData(form);
        props.submitComment(formData);
    };
    const toggleCommentForm = () => {
       toogle(!isOpen);
    };

    if (isOpen) {
        return (
            <form id="comment_form">
                <textarea name="text" cols="30" rows="10"></textarea>
                <button type="button" onClick={submitComment}>Comment</button>
                <button onClick={toggleCommentForm}>Close</button>
            </form>
        )
    } else {
        return (
            <button onClick={toggleCommentForm}>Write comment</button>
        )
    }
}