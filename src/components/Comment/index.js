import React, { useState, useEffect } from "react";
import Comments from "../Comments";
import { fetchUser, fetchComment } from "../../api";
import {
  Wrapper,
  CommentText,
  UserPhoto,
  Group1,
  TimeStamp,
  Controls,
  Upvote,
  Votes,
  Downvote,
  Reply,
  ToggleReplies
} from "./styles";

function Comment({ id, isReply }) {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const [repliesVisibility, setRepliesVisibility] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchComment(id)
      .then((res) => res.json())
      .then((resJson) => setData(resJson))
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { user: id } = data;
    fetchUser(id)
      .then((res) => res.json())
      .then((resJson) => setUser(resJson))
      .catch((err) => setError(err.message));
  }, [data]);

  function toggleVisibility() {
    setRepliesVisibility(!repliesVisibility);
  }

  function renderReplies(replies) {
    return <Comments comments={replies} isReply={true} />;
  }

  function render() {
    return (
      <Wrapper isReply>
        <UserPhoto src={user.photo} />
        <div>
          <Group1>
            <a
              href="https://userprofile.com"
              style={{
                fontWeight: 500,
                textDecoration: "none",
                color: "black"
              }}
            >
              {user.name}
            </a>
            <TimeStamp>{data.timestamp}</TimeStamp>
          </Group1>
          <CommentText>{data.comment}</CommentText>
          <Controls>
            <Upvote />
            <Votes>{data.votes}</Votes>
            <Downvote />
            <Reply>Reply</Reply>
          </Controls>

          <ToggleReplies
            hasReplies={Boolean(data.replies.length)}
            onClick={() => toggleVisibility()}
          >
            {repliesVisibility ? `Hide` : `View`} {data.replies.length} Replies
          </ToggleReplies>
          {repliesVisibility ? <div>{renderReplies(data.replies)}</div> : ""}
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return <p>{error}</p>;
  } else if (user && data) {
    return render();
  } else {
    return <p>Insert fallback component</p>;
  }
}

Comment.defaultProps = {
  isReply: false
};

export default Comment;
