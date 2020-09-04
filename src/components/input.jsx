import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  color: #adb8ba;
`;

const StyledInput = styled.input`
  margin-bottom: 1vh;
  box-sizing: border-box;
  display: inline-block;
  font-size: 0.9rem;
  height: 40px;
  width: 250px;
  padding-left: 9px;
  padding-bottom: 2px;
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  background-color: ${(props) => props.bgColor};
  transition: 0.2s all;
  ::placeholder {
    margin-left: 6px;
  }
  :focus {
    background-color: #f2f6fa;
    outline: none;
    border: 1px solid ${getColor("secondary")};
    box-shadow: 5px 5px 3px -3px rgba(89, 89, 89, 0.3);
  }
`;

const Input = ({ placeholder, label, id, fn, type, name, valid }) => {
  let invalidInput;
  if (!valid) invalidInput = getColor("error");
  id ||
    console.warn(
      "Styled Input requires an id string to match the label with the input "
    );
  label || console.warn("Styled Input requires a label string for a11y");

  return (
    <StyledLabel htmlFor={id}>
      {label ? label : "No Label Passed In"}
      <StyledInput
        id={id}
        name={name || id || "name your Input"}
        onChange={fn}
        onBlur={fn}
        placeholder={placeholder || "Placeholder text"}
        type={type}
        bgColor={invalidInput || getColor("white")}
      />
    </StyledLabel>
  );
};

export default Input;
