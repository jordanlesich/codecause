import React from "react";
import styled from "styled-components";
import { X } from "react-feather";

import { BodySm } from "../styles/typography";
import { getColor } from "../helpers/palette";

const StyledTag = styled.button`
  border: none;
  border-radius: 0.4rem;
  outline: none;
  padding: 0.3rem 0.8rem;
  margin-right: 0.8rem;
  word-break: keep-all;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-left: 0.8rem;
  }
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

const Tag = ({ tag, type, value, fn, className, disabled, withDeleteIcon }) => {
  return (
    <StyledTag
      className={`${type} ${className}`}
      onClick={fn}
      disabled={disabled}
      value={value || tag}
    >
      <BodySm>{tag}</BodySm>
      {withDeleteIcon && <X size="12px" />}
    </StyledTag>
  );
};

export default Tag;
