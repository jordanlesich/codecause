import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../components/button";
import Spinner from "../components/spinner";
import Break from "../components/break";
import TextBox from "../components/textBox";
import Comment from "../components/comment";
import { addComment, getComments } from "../actions/comments";
import { useRef } from "react";
import { useAuth } from "../Hooks/useAuth";

const StyledCommentSection = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 4rem;
  .comment-text-box {
    margin-bottom: 0.4rem;
  }
  .button-box {
    display: flex;
    width: 100%;
    margin-bottom: 4rem;
    button:last-child {
      margin-left: auto;
    }
    button:first-child {
      margin-right: 1.6rem;
    }
  }
  .comments-root {
    list-style: none;
  }
  .list-divider {
    margin-bottom: 4rem;
  }
`;
const scrollToRefObject = (ref, offsetTop) => {
  console.log(ref);
  if (ref) {
    // ref.focus();
    ref.scrollIntoView(offsetTop);
    // window.scrollTo(0, ref.offsetTop);
  }
};

const CommentsSection = ({ projectID }) => {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [numComments, setNumComments] = useState(commentCount);

  const listRef = useRef(null);
  const initialLoad = useRef(false);

  useEffect(() => {
    const getRootComments = async () => {
      setLoading(true);
      try {
        const result = await getComments("main", projectID);
        initialLoad.current = true;
        setComments(result);
      } catch (error) {
        console.error(error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    getRootComments();
  }, [projectID]);

  useEffect(() => {
    if (listRef.current.firstChild) {
      if (initialLoad.current) {
        scrollToRefObject(listRef.current.firstChild, false);
        initialLoad.current = false;
      } else {
        console.log("fired");
        scrollToRefObject(listRef.current.lastChild, true);
      }
    }
  }, [comments]);

  const handleAddComment = async (e) => {
    if (commentInput === "") return "";
    try {
      const result = await addComment(projectID, "main", commentInput, user);
      setCommentInput("");
      if (Array.isArray(result)) {
        setComments(result);
      } else {
        console.error(`received type ${typeof result} from actions/comments`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeComment = (e) => {
    setCommentInput(e.target.value);
  };

  return (
    <StyledCommentSection>
      <TextBox
        className="comment-text-box"
        label="Comment:"
        placeholder="Type your comment here"
        value={commentInput}
        onType={handleTypeComment}
      />
      <div className="button-box">
        <Button
          fn={handleAddComment}
          className="primary"
          content="Post"
          disabled={commentInput === ""}
        />
      </div>
      <Break type="hard" className="list-divider" />
      {loading && <Spinner />}
      <ul className="comments-root" ref={listRef}>
        {comments?.map((comment, index) => (
          <li key={comment.id}>
            <Comment
              comment={comment}
              user={user}
              projectID={projectID}
              scrollToRefObject={scrollToRefObject}
            />
          </li>
        ))}
      </ul>
    </StyledCommentSection>
  );
};

export default CommentsSection;
