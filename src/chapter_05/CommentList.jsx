import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "불지옥",
        comment: "안녕하세요, 불지옥입니다.",
    },
    {
        name: "지옥",
        comment: "안녕하세요, 지옥입니다.",
    },
    {
        name: "가시지옥",
        comment: "안녕하세요, 가시지옥입니다.",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;