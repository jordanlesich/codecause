import React, { useContext, useState, useEffect } from "react";
import { Star } from "react-feather";
import styled from "styled-components";

import { AuthContext } from "../contexts/authContext";
import { getColor } from "../helpers/palette";
import { addVote, removeVote } from "../actions/votes";

const VoteBox = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  border: 1px solid
    ${(props) =>
      props.isClicked ? getColor("successBorder") : getColor("lightBorder")};
  border-radius: 4px;
  transition: 0.15s all;
  background-color: ${(props) =>
    props.isClicked ? getColor("successHighlight") : getColor("white")};
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    background-color: ${(props) =>
      props.isClicked ? getColor("successHighlight") : getColor("white")};
    .vote-icon {
      color: ${(props) =>
        props.isClicked ? getColor("successDark") : getColor("secondary")};
    }
    .vote-text {
      color: ${(props) =>
        props.isClicked ? getColor("successDark") : getColor("secondary")};
    }
  }
  .vote-icon,
  .loading-dots {
    display: flex;
    color: ${(props) =>
      props.isClicked ? getColor("success") : getColor("secondary")};
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    margin: 0.125rem;
    padding: 2px;
    transition: 0.2s all;
  }
  .vote-text {
    color: ${(props) =>
      props.isClicked ? getColor("success") : getColor("secondary")};
    font-weight: 500;
    margin-left: 0.25rem;
    transition: 0.2s all;
  }
`;

const Votes = ({ votes, id }) => {
  const { user, handleLocalVote } = useContext(AuthContext);
  const [voteState, setVoteState] = useState({
    votes: votes,
    hasVoted: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && voteState.hasVoted === null) {
      setVoteState((prevState) => ({
        votes: prevState.votes,
        hasVoted: user.profile.starredProjects.includes(id),
      }));
    }
  }, [user, voteState, id]);

  const handleClick = (e) => {
    if (loading) return;
    if (!user) return;
    if (voteState.hasVoted) {
      removeVote(user.profile, id, setVoteState, setLoading);
      handleLocalVote("remove", id);
    } else {
      addVote(user.profile, id, setVoteState, setLoading);
      handleLocalVote("add", id);
    }
  };

  return (
    <VoteBox onClick={handleClick} isClicked={voteState.hasVoted}>
      {loading ? (
        <p className="vote-text">...</p>
      ) : (
        <>
          <Star className={`vote-icon`} />
          <p className="vote-text ">{voteState.votes}</p>
        </>
      )}
    </VoteBox>
  );
};

export default Votes;
