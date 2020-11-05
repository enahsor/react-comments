import React from "react";
import Comment from "../Comment";
import { fetchComments, fetchCommentsArr } from "../../api";

function Comments({ comments }) {
  function renderComments() {
    return comments.map((id) => {
      return <Comment key={id} id={id} />;
    });
  }

  return <div>{renderComments()}</div>;
}

export default Comments;
