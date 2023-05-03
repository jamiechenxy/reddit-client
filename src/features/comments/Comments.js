import React from "react";
import '../../css/Comments.css';
import moment from "moment";

export const Comments = (props) => {
    const {comment} = props;

    return (
        <div className="reddit-comments-box">
            <div className="comment-post-info">
                    <h4 className="commentor">{comment.author}</h4>
                    <p className="comment-post-time"><em>{moment.unix(comment.created_utc).fromNow()}</em></p>
            </div>
            <p className="comment-text">
                {comment.body};
            </p>
        </div>
    )
}