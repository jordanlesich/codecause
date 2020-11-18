import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Spinner from "./spinner";
import Input from "./input";
import Button from "./button";
import Break from "./break";
import { addComment, getComments } from "../actions/comments";
import { BodyXs, BodyMd, BoldText } from "../styles/typography";
import { getColor } from "../helpers/palette";

const StyledComment = styled.div`
  margin-bottom: 2.4rem;
  .info-text {
    margin-bottom: 0.8rem;
    color: ${getColor("grey500")};
  }
  .comment-text {
    margin-bottom: 0.8rem;
  }
  .reply-box {
    display: flex;
    margin-bottom: 1.6rem;
    button:first-child {
      margin-right: auto;
    }
    /* button:last-child {
      margin-left: auto;
    } */
  }
  .comment-button {
    text-transform: uppercase;
    font-size: 1.1rem;
    color: ${getColor("primary")};
    padding: 0;
    height: fit-content;
  }
  .comment-juice {
    padding: 0;
    font-size: 1.1rem;
  }
  .cancel {
    color: ${getColor("grey400")};
  }
  .replies-root {
    margin-left: 1.6rem;
    padding-left: 2.4rem;
    border-left: 1px solid ${getColor("lightBorder")};
    margin-top: 2.4rem;
  }
  .comment-link {
    color: ${getColor("blue400")};
    text-decoration: none;
    :hover,
    :focus {
      color: ${getColor("blue200")};
    }
    :visited {
      color: ${getColor("blue400")};
    }
  }
`;

const Comment = ({ comment, projectID, user }) => {
  const [replyDisplay, setReplyDisplay] = useState("idle");
  const [replies, setReplies] = useState([]);
  const [replyInput, setReplyInput] = useState("");
  const [replyCount, setReplyCount] = useState(comment.replyCount);

  const handleTyping = (e) => {
    setReplyInput(e.target.value);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    setReplyDisplay("loading");
    try {
      const newReplies = await addComment(
        projectID,
        comment.id,
        replyInput,
        user,
        comment.parent
      );
      setReplies(newReplies);
      setReplyCount(newReplies.length);
      setReplyDisplay("display");
    } catch (error) {
      console.error(error);
      setReplyDisplay("idle");
    } finally {
      setReplyInput("");
    }
  };

  const displayReplies = async () => {
    if (replies.length && replyCount > 0) {
      setReplyDisplay("display");
    } else {
      setReplyDisplay("loading");
      try {
        const replies = await getComments(comment.id, projectID);
        setReplies(replies);
        setReplyDisplay("display");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleReplyBox = (e) => {
    if (e.target.value === "reply") {
      setReplyDisplay("replying");
    } else {
      setReplyDisplay("idle");
    }
  };

  return (
    <StyledComment>
      <BodyXs className="info-text scroll-to">
        Posted by
        <Link to={`/user/${comment.fromID}`} className="comment-link">
          <BoldText> {comment.from} </BoldText>
        </Link>
        {formatDistanceToNow(comment.sent)} ago
      </BodyXs>
      <BodyMd className="comment-text">{comment.text}</BodyMd>
      <div className="reply-box">
        {replyDisplay === "replying" ? (
          <Button
            content="cancel"
            fn={toggleReplyBox}
            className="text-button comment-button cancel"
            value="cancel"
          />
        ) : (
          <Button
            fn={toggleReplyBox}
            content="reply"
            className="text-button comment-button"
            value="reply"
          />
        )}
        {replyCount > 0 &&
          (replyDisplay === "display" ? (
            <Button
              content="hide replies"
              className="text-button comment-button"
              fn={toggleReplyBox}
              value={"hide"}
            />
          ) : (
            <Button
              content="see replies"
              className="text-button comment-button"
              fn={displayReplies}
            />
          ))}
      </div>
      {replyDisplay === "display" || <Break type="soft" />}
      {replyDisplay === "replying" && (
        <form onSubmit={handleSubmitReply}>
          <Input
            externalLabel
            className="reply-text-box"
            autoFocus
            placeholder="Reply here"
            value={replyInput}
            onType={handleTyping}
          />
          <Break type="soft" />
        </form>
      )}
      {replyDisplay === "loading" && <Spinner radius="4rem" />}
      <ul className="comments-root replies-root">
        {replyDisplay === "display" &&
          replies.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} user={user} projectID={projectID} />
            </li>
          ))}
      </ul>
    </StyledComment>
  );
};

export default Comment;
