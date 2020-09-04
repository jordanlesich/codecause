import React, { useContext, useState } from "react";
import { Star } from "react-feather";
import styled from "styled-components";

import { AuthContext } from "../contexts/authContext";
import { getColor } from "../helpers/palette";

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

const Votes = ({ votes, projectId }) => {
  const { user } = useContext(AuthContext);

  const [voteData] = useState({
    voteAmt: votes.length,
    hasVoted: votes.includes((userId) => userId === user.id),
  });
  const [loading, setLoading] = useState(false);

  console.log(voteData);
  const handleClick = (e) => {
    if (!voteData.hasVoted) {
      const params = {
        user_id: user.id,
        project_id: projectId,
      };
      // addVote({ setVoteData, params, setLoading, projectId });
    } else {
      ///delete vote
    }
  };

  return (
    <VoteBox onClick={handleClick} isClicked={voteData.hasVoted}>
      {loading ? (
        <div className="loading-dots">...</div>
      ) : (
        <Star className={`vote-icon`} />
      )}
      <p className="vote-text ">{voteData.voteAmt || "0"}</p>
    </VoteBox>
  );
};

export default Votes;
