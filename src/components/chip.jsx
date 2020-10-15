import React, { useContext } from "react";
import styled from "styled-components";

import { TagContext } from "../contexts/tagSearchContext";
import { getColor } from "../helpers/palette";

export const StyledChip = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3.4rem;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;
  font-family: inherit;
  padding: 0.7rem 1.6rem;
  border-radius: 100px;
  cursor: pointer;
  transition: 0.2s all;
  outline: none;
  background-color: ${getColor("white")};
  border: solid 1px ${getColor("grey200")};
  color: ${getColor("dark")};
  :hover:enabled {
    background-color: ${getColor("grey100")};
  }
  :active:enabled {
    background-color: ${getColor("grey200")};
  }

  &.selected {
    background-color: ${getColor("dark")};
    color: ${getColor("white")};
    :hover:enabled,
    :focus:enabled {
      background-color: ${getColor("dark")};
    }
  }
`;

const getChipText = (initialStr, allTags) => {
  if (!allTags || !allTags.length) {
    return initialStr;
  }
  const selectedTags = allTags.filter((tag) => tag.selected);
  if (!selectedTags || !selectedTags.length) {
    return initialStr;
  } else if (selectedTags.length === 1) {
    return `${initialStr} | ${selectedTags[0].name}`;
  } else {
    return `${initialStr} | ${selectedTags[0].name} and ${
      selectedTags.length - 1
    } more`;
  }
};

const Chip = ({ className, initialStr, fn, selected, disabled, value }) => {
  const { useTagContext } = useContext(TagContext);
  const [tags] = useTagContext(value);

  return (
    <StyledChip
      onClick={fn}
      disabled={disabled}
      className={`${className} ${selected && "selected"}`}
      value={value}
    >
      {getChipText(initialStr, tags)}
    </StyledChip>
  );
};

export default Chip;
