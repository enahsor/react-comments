import styled from "styled-components";
import { ReactComponent as Up } from "../../assets/thumbs_up.svg";
import { ReactComponent as Down } from "../../assets/thumbs_down.svg";
import { ReactComponent as Menu } from "../../assets/comment_menu.svg";

export const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  margin-top: ${(props) => (props.isReply ? 20 : 30)}px;
`;

export const CommentText = styled.p`
  font-size: 14px;
`;

export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  object-fit: cover;
  margin-right: 20px;
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

const RatingSharedStyles = (Icon) => {
  return styled(Icon)`
    width: 17px;
    height: 17px;
    fill: lightgray;
    transition: 1s;
    :hover {
      cursor: pointer;
      fill: darkgray;
    }
  `;
};

export const Upvote = RatingSharedStyles(Up);

export const Downvote = RatingSharedStyles(Down);

export const Votes = styled.span``;

export const Reply = styled.button`
  text-transform: uppercase;
  padding: 6px;
  font-weight: bold;
  border: none;
  transition: 1s;
  background-color: lightgray;
  :hover {
    cursor: pointer;
    background-color: darkgray;
  }
`;

export const ToggleReplies = styled.p`
  cursor: pointer;
  display: ${(props) => (props.hasReplies ? "" : "none")};
`;
