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

const Votes = ({ project, variant }) => {
  const { user, handleLocalVote } = useAuth();
  const { votes, slug } = project;
  const [hasVoted, setHasVoted] = useState(votes[user.displayName]);
  const [voteList, setVoteList] = useState(Object.keys(votes));
  const [loading, setLoading] = useState(false);

  const handleRemoveVote = async () => {
    try {
      const result = await removeVote(user, project);
      setHasVoted(false);
      //since the vote data is public facing, I use displayName instead of ID
      setVoteList((prevVotes) =>
        prevVotes.filter((vote) => vote !== user.displayName)
      );
      handleLocalVote("remove", slug);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVote = async () => {
    try {
      const result = await addVote(user, project);
      setHasVoted(true);
      //since the vote data is public facing, I use displayName instead of ID
      setVoteList((prevVotes) => [user.displayName, ...prevVotes]);
      handleLocalVote("remove", slug);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = (e) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);
    if (hasVoted) {
      handleRemoveVote();
    } else {
      handleAddVote();
    }
  };

  return (
    <StyledVoteButton className="vote-button">
      {variant === "listing" ? (
        <>
          <Button
            content={getVoteText(hasVoted, voteList.length)}
            className={`text-button ${hasVoted && "has-voted"}`}
            fn={handleClick}
            withIcon={<ThumbsUp size="2.4rem" />}
          />
          <div className="vote-list">
            {voteList?.length > 0 &&
              voteList
                .slice(0, 15)
                .map((vote) => <BodyMd key={vote}>{vote}</BodyMd>)}
          </div>
        </>
      ) : (
        <Button
          content={getVoteText(hasVoted, voteList.length)}
          className={`secondary ${hasVoted && "has-voted"}`}
          fn={handleClick}
          withIcon={<ThumbsUp size="2rem" />}
        />
      )}
    </StyledVoteButton>
  );
};

export default Votes;
