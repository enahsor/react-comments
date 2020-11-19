import React, { useState, useEffect, useRef } from "react";
import { fetchReplies } from "../../api";
import useSwr from "swr";
import {
  Wrapper,
  FallbackComponent,
  CommentText,
  UserPhoto,
  Group1,
  TimeStamp,
  Controls,
  Upvote,
  Votes,
  Downvote,
  Button,
  ToggleReplies,
  ReplyField,
  ReplyFieldWrapper,
  ReplySection
} from "./styles";

function Comment({ commentData, style }) {
  const [data, setData] = useState(() => commentData);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState([]);
  const [voteCast, setVoteCast] = useState(null);
  const [replyFieldVis, setReplyFieldVis] = useState(false);
  const [repliesVisibility, setRepliesVisibility] = useState(false);
  const [reply, setReply] = useState("");
  const [isReplyFocused, setIsReplyFocused] = useState(false);

  const replyRef = useRef();

  function focusReply() {
    replyRef.current.focus();
  }

  useEffect(() => {
    if (!replyFieldVis) {
      return;
    }
    focusReply();
  }, [replyFieldVis]);

  useEffect(() => {
    if (!repliesVisibility) {
      return;
    }
    setStatus("pending");
    fetchReplies(commentData.id)
      .then((data) => {
        setReplies(data);
        setStatus("resolved");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("rejected");
      });
  }, [repliesVisibility, commentData]);

  function handleReplyClick(e) {}

  function toggleVisibility() {
    setRepliesVisibility(!repliesVisibility);
  }

  function renderReplies() {
    if (status === "idle") {
      return "";
    } else if (status === "pending") {
      return <FallbackComponent />;
    } else if (status === "resolved") {
      return replies.map((reply) => (
        <Comment key={reply.id} commentData={reply} />
      ));
    } else if (status === "rejected") {
      return <p>{error}</p>;
    }
  }

  function showReplyField(e) {
    setReplyFieldVis(true);
  }

  function hideReplyField() {
    setReplyFieldVis(false);
  }

  function upvote(e) {
    const castType = "upvote";
    if (voteCast === castType) {
      return;
    }
    setData(Object.assign({}, data, { votes: data.votes + 1 }));
    setVoteCast(castType);
  }

  function downvote(e) {
    const castType = "downvote";
    if (voteCast === castType) {
      return;
    }
    setData(Object.assign({}, data, { votes: data.votes - 1 }));
    setVoteCast(castType);
  }

  function render() {
    return (
      <Wrapper style={style}>
        <UserPhoto
          loading="lazy"
          src={data.user.photo}
          style={{
            width: "50px",
            height: "50px",
            marginRight: "20px",
            borderRadius: "30px"
          }}
        />
        <div style={{ width: "100%" }}>
          <Group1>
            <a
              href="https://userprofile.com"
              style={{
                fontWeight: 500,
                textDecoration: "none",
                color: "black"
              }}
            >
              {data.user.name}
            </a>
            <TimeStamp>{data.timestamp}</TimeStamp>
          </Group1>
          <CommentText>{data.comment}</CommentText>
          <Controls>
            <Upvote onClick={(e) => upvote(e)} votecast={voteCast} />
            <Votes>{data.votes <= 0 ? "" : data.votes}</Votes>
            <Downvote onClick={(e) => downvote(e)} votecast={voteCast} />
            <Button onClick={(e) => showReplyField(e)}>Reply</Button>
          </Controls>
          <ReplySection replyFieldVis={replyFieldVis}>
            <ReplyFieldWrapper isReplyFocused={isReplyFocused}>
              <ReplyField
                onChange={(e) => setReply(e.target.value)}
                ref={replyRef}
                type="text"
                placeholder="Add comment..."
                onFocus={() => setIsReplyFocused(true)}
                onBlur={() => setIsReplyFocused(false)}
              />
            </ReplyFieldWrapper>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={(e) => hideReplyField(e)} color="red">
                Cancel
              </Button>
              <Button
                default
                disabled={reply.trim() ? false : true}
                onClick={handleReplyClick}
              >
                Reply
              </Button>
            </div>
          </ReplySection>

          <ToggleReplies
            hasReplies={Boolean(data.replies)}
            onClick={() => toggleVisibility()}
          >
            {repliesVisibility ? `Hide` : `View`} {data.replies} Replies
          </ToggleReplies>
          <div>{repliesVisibility ? renderReplies() : null}</div>
        </div>
      </Wrapper>
    );
  }

  return render();
}

Comment.defaultProps = {
  isReply: false
};

export default Comment;
