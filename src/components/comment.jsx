import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import useToggle from "../Hooks/useToggle";
import TextBox from "../components/textBox";
import Button from "./button";

const StyledComment = styled.div`
  .replies {
    margin-left: 1rem;
  }
  .comment-box {
    height: 6rem;
    font-size: 1rem;
    padding: 0.5rem;
  }
  .comment-sender {
    font-size: 1.1rem;
    font-weight: 500;
  }
  .comment.body {
  }
`;

const Comment = ({ id, addReply, text, sender, replies, timeSent }) => {
  const [isReplying, toggleIsReplying] = useToggle(false);
  const [loading, toggleLoading] = useToggle(false);
  const [replyText, setReplyText] = useState("");

  const handleTyping = (e) => {
    setReplyText(e.target.value);
  };
  const handleSubmitReply = (e) => {
    e.preventDefault();
    addReply(id, replyText, toggleLoading);
    setReplyText("");
    toggleIsReplying();
  };
  return (
    <StyledComment>
      <p className="comment-sender">{sender.name} </p>
      <p className="comment-body">{text}</p>
      <p>{formatDistanceToNow(timeSent)} ago</p>
      <div className="replies">
        {loading && <p>loading</p>}
        {isReplying ? (
          <>
            <label htmlFor={`${id}-reply-input`}>Leave Reply:</label>
            <TextBox
              id={`${id}-reply-input`}
              value={replyText}
              fn={handleTyping}
            />
            <Button type="submit" content="reply" fn={handleSubmitReply} />
          </>
        ) : (
          <Button content="reply" fn={toggleIsReplying} />
        )}
        {replies?.length > 0 &&
          replies.map((comment) => {
            const subId = uuidv4();
            return (
              <Comment
                key={subId}
                id={comment.id}
                sender={comment.from}
                text={comment.text}
                addReply={addReply}
                timeSent={comment.sent}
                replies={comment.replies}
              />
            );
          })}
      </div>
    </StyledComment>
  );
};

export default Comment;
