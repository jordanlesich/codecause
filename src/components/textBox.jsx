import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";

const StyledTextBox = styled.textarea`
  display: inline-block;
  background-color: ${(props) => props.bgColor};
  box-sizing: border-box;
  resize: none;
  color: ${(props) => props.color};
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0.5rem;

  width: 100%;
  border: ${(props) => props.border};
  border-radius: 4px;
  transition: 0.2s all;
  font-family: inherit;
  ::placeholder {
    margin-left: 6px;
    color: ${(props) => props.color};
    opacity: 0.2;
  }
  :focus {
    outline: none;
    background-color: ${getColor("white")};
  }
  :disabled {
    background-color: ${getColor("lightBorder")};
  }
`;

const TextBox = ({
  placeholder,
  value,
  border,
  id,
  fn,
  name,
  className,
  color,
}) => {
  id ||
    console.warn(
      "Styled Input requires an id string to match the label with the input "
    );

  return (
    <StyledTextBox
      id={id}
      name={name || id || "name your Input"}
      color={color || getColor("font")}
      border={border || `1px solid ${getColor("lightBorder")}`}
      bgColor={color || getColor("lightgrey")}
      onChange={fn}
      onBlur={fn}
      placeholder={placeholder || "Placeholder text"}
      className={className}
      value={value}
    />
  );
};

export default TextBox;
