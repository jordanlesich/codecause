import React from "react";
import styled from "styled-components";
import { X } from "react-feather";
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
  :hover:enabled {
    background-color: rgba(0, 112, 243, 0.2);
  }
  :disabled {
    color: ${getColor("secondary300")};
    cursor: default;
  }
`;

export const LargeTag = styled.button`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  outline: none;
  background-color: ${getColor("secondary200")};
  border: 1px solid ${getColor("secondary300")};
  border-radius: 4px;
  font-weight: 500;
  color: ${getColor("font")};
  cursor: pointer;
  transition: 0.15s all;
  .icon {
    transform: translateY(0.1rem);
  }
  :hover:enabled {
    background-color: ${getColor("secondary300")};
    color: ${getColor("dark")};
  }
  :disabled {
    background-color: ${getColor("secondary100")};
    color: ${getColor("secondary300")};
    cursor: default;
  }
`;

const Tag = ({ text, type, value, fn, remove, disabled }) => {
  const handleClick = (e) => {
    fn({
      field: type,
      value: value,
    });
  };
  return (
    <>
      {type === "skill" && (
        <SmallTag value={value} onClick={handleClick} disabled={disabled}>
          {text}
          {remove && <X size=".7rem" className="icon" />}
        </SmallTag>
      )}
      {type === "solution" && (
        <LargeTag value={value} onClick={handleClick} disabled={disabled}>
          {text}
          {remove && <X size="1rem" className="icon" />}
        </LargeTag>
      )}
      {type === "cause" && (
        <LargeTag value={value} onClick={handleClick} disabled={disabled}>
          {text}
          {remove && <X size="1rem" className="icon" />}
        </LargeTag>
      )}
    </>
  );
};

export default Tag;
