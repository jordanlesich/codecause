import React from "react";
import styled from "styled-components";
import { BodySm } from "../styles/typography";
import { getColor } from "../helpers/palette";

const StyledTag = styled.button`
  border: none;
  border-radius: 0.4rem;
  outline: none;
  padding: 0.3rem 0.8rem;
  margin-right: 0.8rem;
  word-break: keep-all;

  cursor: pointer;
  &.skill:enabled {
    background-color: ${getColor("blue000")};
    color: ${getColor("blue400")};
  }
  &.solution:enabled {
    background-color: ${getColor("green000")};
    color: ${getColor("green400")};
  }
  &.cause:enabled {
    background-color: ${getColor("purple000")};
    color: ${getColor("purple400")};
  }
  :disabled {
    background-color: ${getColor("grey100")};
    color: ${getColor("grey300")};
    cursor: default;
  }
`;

const Tag = ({ tag, fn, className, disabled }) => {
  const handleClick = (e) => {
    fn({
      field: tag.type,
      value: tag.name,
    });
  };

  return (
    <StyledTag
      className={`${tag.type} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <BodySm>{tag.name}</BodySm>
    </StyledTag>
  );
};

export default Tag;
