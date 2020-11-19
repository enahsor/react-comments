import React, { useState, useEffect } from "react";
import { fetchVideo } from "../../api";
import { FallbackComponent } from "./styles";
import Comment from "../Comment";
import PropType from "prop-types";

// To Do

// Highlight whether user liked or disliked comment
// Might be better to change

function Comments({ currentVideo }) {
  // ADD debouncing
  // ADD cacheing

  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentVideo) {
      return;
    }
    setStatus("pending");
    fetchVideo(currentVideo)
      .then((data) => {
        setComments(data);
        setStatus("resolved");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("rejected");
      });
  }, [currentVideo]);

  function renderComments() {
    if (comments.length <= 0) {
      return <p style={{ textAlign: "center" }}>No comments available</p>;
    }
    return comments.map((comment) => (
      <Comment key={comment.id} commentData={comment} />
    ));
  }

  function render() {
    if (status === "idle") {
      return <p style={{ textAlign: "center" }}>Select a number</p>;
    } else if (status === "pending") {
      return <FallbackComponent size={30} />;
    } else if (status === "resolved") {
      return renderComments();
    } else if (status === "rejected") {
      return <p>{error}</p>;
    }
  }

  return render();
}

Comments.propTypes = {
  comments: PropType.array
};

export default Comments;
