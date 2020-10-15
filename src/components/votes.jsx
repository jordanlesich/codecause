import React, { useState } from "react";
import styled from "styled-components";
import { ThumbsUp } from "react-feather";

import Button from "./button";
import { useAuth } from "../Hooks/useAuth";
import { getColor } from "../helpers/palette";
import { BodyMd } from "../styles/typography";
import { addVote, removeVote } from "../actions/votes";

const getVoteText = (hasVoted, voteAmt) => {
  if (hasVoted) {
    if (voteAmt === 1) {
      return "Liked by you";
    } else if (voteAmt === 2) {
      return "Liked by you and one other";
    } else {
      return `Liked by you and ${voteAmt - 1} others`;
    }
  } else {
    if (voteAmt === 1) {
      return "1 Like";
    } else {
      return `${voteAmt} Likes`;
    }
  }
};
const StyledVoteButton = styled.div`
  position: relative;
  transition: 0.3s all;
  .has-voted {
    svg {
      color: ${getColor("blue300")};
      fill: ${getColor("blue000")};
    }
    color: ${getColor("blue400")};
  }
  .vote-list {
    opacity: 0;
    position: absolute;
    width: 25rem;
    border-radius: 0.4rem;
    top: 100%;
    left: 0;
    background-color: ${getColor("dark")};
    color: ${getColor("white")};
    padding: 0.8rem 1.6rem;
    transition: 0.3s opacity;
    p {
      padding: 0.2rem;
    }
  }
  :hover {
    .vote-list {
      opacity: 0.8;
    }
  }
`;

const Votes = ({ project }) => {
  const { user, handleLocalVote } = useAuth();
  const { votes, slug } = project;
  const [voteState, setVoteState] = useState({
    votes: votes,
    hasVoted: user?.votedProjects?.includes(slug),
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user && voteState.hasVoted === null) {
  //     setVoteState((prevState) => ({
  //       votes: prevState.votes,
  //       hasVoted: ,
  //     }));
  //   }
  // }, [user, voteState, slug]);

  const handleClick = async (e) => {
    if (loading) return;
    if (!user) return;
    if (voteState.hasVoted) {
      removeVote(user, project, setVoteState, setLoading);
      handleLocalVote("remove", slug);
    } else {
      addVote(user, project, setVoteState, setLoading);
      handleLocalVote("add", slug);
    }
  };

  return (
    <StyledVoteButton className="vote-button">
      <Button
        content={getVoteText(voteState.hasVoted, voteState.votes.length)}
        className={`text-button ${voteState.hasVoted && "has-voted"}`}
        fn={handleClick}
        withIcon={<ThumbsUp size="2.4rem" />}
      />
      {votes?.length && (
        <div className="vote-list">
          {voteState.votes.slice(0, 15).map((vote) => (
            <BodyMd key={vote}>{vote}</BodyMd>
          ))}
        </div>
      )}
    </StyledVoteButton>
  );
};

export default Votes;
