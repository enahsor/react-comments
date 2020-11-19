import styled, { keyframes } from "styled-components";
import React from "react";

import { FaSpinner } from "react-icons/fa";
import { ReactComponent as Up } from "../../assets/thumbs_up.svg";
import { ReactComponent as Down } from "../../assets/thumbs_down.svg";
import { ReactComponent as Menu } from "../../assets/comment_menu.svg";

const fadeIn = keyframes`
  from{
    opacity: 0;
    
  }
  to{
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  animation: ${fadeIn} 1.5s;
`;

const spin = keyframes`
  from{
    transform: rotate(0deg);
  }  
  to{
    transform: rotate(360deg);
  }
`;

export const FallbackComponent = styled(FaSpinner)`
  fill: gray;
  animation: ${spin} 2s linear infinite;
`;

export const CommentText = styled.p`
  font-size: 14px;
`;

export const UserPhoto = styled.img`
  object-fit: cover;
`;

export const Group1 = styled.div`
  display: flex;
  font-size: 15px;
`;

export const TimeStamp = styled.div`
  color: gray;
  font-weight: 300;
  margin-left: 10px;
  align-self: center;
`;

export const Controls = styled.div`
  margin-top: 20px;
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function RatingSharedStyles(Icon) {
  return styled(Icon)`
    width: 17px;
    height: 17px;
    fill: lightgray;
    transition: 0.4s;
    cursor: pointer;
    :hover {
      fill: darkgray;
    }
  `;
}

export const Upvote = styled(RatingSharedStyles(Up))`
  fill: ${(props) => (props.votecast === "upvote" ? "blue" : "")};
`;

export const Downvote = styled(RatingSharedStyles(Down))`
  fill: ${(props) => (props.votecast === "downvote" ? "blue" : "")};
`;

export const Votes = styled.span``;

export const Button = styled.button`
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  padding: 6px;
  font-weight: 500;
  background: none;
  border: none;
  transition: 0.5s;
  font-size: 15px;
  color: ${(props) => (props.color ? props.color : "darkgray")};
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  margin-left: 10px;
  ${(props) =>
    props.default
      ? `
  background: blue;
  border-radius: 3px;
  padding: 6px 12px;
  color: white;

  `
      : null}

  :focus {
    border: none;
    outline: none;
  }

  :disabled {
    background-color: lightgray;
    color: gray;
  }
`;

export const ToggleReplies = styled.p`
  cursor: pointer;
  color: blue;
  display: ${(props) => (props.hasReplies ? "" : "none")};
  user-select: none;
`;

export const ReplyFieldWrapper = styled.div`
  margin-bottom: 10px;

  border-bottom: 1px solid lightgray;

  &:after {
    display: block;
    content: "";
    border-bottom: solid 1.5px black;
    transform: scaleX(${(props) => (props.isReplyFocused ? 1 : 0)});
    transition: transform 200ms ease-in-out;
  }
`;

export const ReplyField = styled.input`
  border: none;
  width: 90%;
  transform-origin: center;
  display: inline-block;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-family: "Poppins", sans-serif;
  }
`;

export const ReplySection = styled.div`
  display: ${(props) => (props.replyFieldVis ? "flex" : "none")};
  flex-direction: column;
`;
