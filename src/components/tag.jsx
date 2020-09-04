import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";

export const SmallTag = styled.button`
  color: ${getColor("primary")};
  font-size: 0.8rem;
  outline: none;
  font-weight: 500;
  padding: 0.25rem;
  margin: 0.25rem;
  cursor: pointer;
  background-color: rgba(0, 112, 243, 0);
  border-radius: 10%;
  transition: 0.15s all;
  border: none;
  :hover {
    background-color: rgba(0, 112, 243, 0.2);
  }
`;

export const LargeTag = styled.button`
  font-size: 1rem;
  padding: 0.25rem;
  outline: none;
  background-color: ${getColor("white")};
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  font-weight: 500;
  color: ${getColor("secondary")};
  cursor: pointer;
  transition: 0.15s all;
  :hover {
    background-color: ${getColor("lightgrey")};
    color: ${getColor("dark")};
  }
`;

const Tag = ({ text, type, value, fn }) => {
  return (
    <>
      {type === "skill" && (
        <SmallTag value={value} onClick={fn}>
          {text}
        </SmallTag>
      )}
      {type === "project" && (
        <LargeTag value={value} onClick={fn}>
          {text}
        </LargeTag>
      )}
      {type === "cause" && (
        <LargeTag value={value} onClick={fn}>
          {text}
        </LargeTag>
      )}
    </>
  );
};

export default Tag;
