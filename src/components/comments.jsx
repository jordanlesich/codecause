import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { addComment, getComments, buildComment } from "../actions/comments";
import { AuthContext } from "../contexts/authContext";
import useToggle from "../Hooks/useToggle";
import Button from "../components/button";
import TextBox from "../components/textBox";
import Comment from "../components/comment";

const CommentSection = styled.form`
  grid-column: 3/4;
  margin: 0 4rem;

  .comment-box {
    height: 6rem;
    font-size: 1rem;
    padding: 0.5rem;
  }
  .comments-title {
    font-size: 1rem;
  }
`;

const Comments = ({ projRef }) => {
  const [comments, setComments] = useState(null);
  const [isCommenting, toggleCommenting] = useToggle(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleTypeComment = (e) => {
    setCommentText(e.target.value);
  };

  const loadComments = () => {
    getComments(projRef, setComments);
  };

  const handleSubmitComment = (e) => {
    //TODO Handle UI and conditional logic for users who are not logged in
    e.preventDefault();
    const comment = buildComment(commentText, user.profile);
    addComment([...comments, comment], projRef, setComments, setLoading);
    toggleCommenting();
    setCommentText("");
  };
  const addReply = (id, str, replyLoading) => {
    //TODO Handle UI and conditional logic for users who are not logged in

    //this is a recursive function that searches each level
    //for the comment that is being replied to. Once that is finished
    //In order to improve performance, I offer conditionals for
    //for shallowly nested replies.
    const newReply = buildComment(str, user.profile);
    const findAndRebuild = (comments, id) => {
      // let searchIDs = {};
      const newComments = [];
      for (let comment of comments) {
        if (comment.id === id) {
          newComments.push({
            ...comment,
            replies: [...comment.replies, newReply],
          });
        } else {
          if (comment.replies.length) {
            newComments.push({
              ...comment,
              replies: findAndRebuild(comment.replies, id),
            });
          } else {
            newComments.push(comment);
          }
        }
      }
      return newComments;
    };
    addComment(
      findAndRebuild(comments, id),
      projRef,
      setComments,
      replyLoading
    );
    // if (parent === "main") {
    //   const newComments = comments.map((comment) => {
    //     if (comment.id === id) {
    //       return {
    //         ...comment,
    //         replies: [...comment.replies, newReply],
    //       };
    //     } else {
    //       return comment;
    //     }
    //   });
    //   setComments(newComments);
    // }
    // else{

    // }
    // const comments.find()

    //make a copy of that comment's replies
    //add our reply
  };
  return (
    <>
      {!comments && <Button fn={loadComments} content="Read Comments" />}
      {comments === "loading" && <h2>Loading</h2>}
      {Array.isArray(comments) && (
        <CommentSection>
          {!isCommenting ? (
            <Button fn={toggleCommenting} content="Add a Comment" />
          ) : (
            <>
              <label
                className="comments-title"
                htmlFor={`${projRef}-comment-input`}
              >
                Add a Comment:
              </label>
              <TextBox
                id={`${projRef}-comment-input`}
                className="comment-box"
                fn={handleTypeComment}
                value={commentText}
                disabled={loading}
              />
              <Button fn={handleSubmitComment} content={"send"} />
            </>
          )}
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                addReply={addReply}
                sender={comment.from}
                text={comment.text}
                timeSent={comment.sent}
                replies={comment.replies}
              />
            );
          })}
        </CommentSection>
      )}
    </>
  );
};

export default Comments;
