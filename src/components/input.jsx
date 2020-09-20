import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";

const StyledLabel = styled.label`
  /* display: flex;
  flex-direction: column; */
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  letter-spacing: -0.022em;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  width: ${(props) => props.width};
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  display: inline-block;
  font-size: 1rem;
  height: 40px;
  width: ${(props) => props.width};
  padding-left: 9px;
  padding-bottom: 2px;
  margin-top: 0.5rem;
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

    box-shadow: 5px 5px 3px -3px rgba(89, 89, 89, 0.3);
  }
`;

const Input = ({
  placeholder,
  autoFocus,
  label,
  id,
  fn,
  type,
  name,
  valid,
  value,
  disabled = false,
  width = "250px",
}) => {
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
        value={value}
        bgColor={invalidInput || getColor("white")}
        disabled={disabled}
        width={width}
        autoFocus={autoFocus}
      />
    </StyledLabel>
  );
};

export default Input;
