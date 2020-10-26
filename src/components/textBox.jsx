import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";
import { HeaderXs, BodySm } from "../styles/typography";

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 28rem;
  min-width: 22rem;
  flex-direction: column;
  margin-bottom: 0.8rem;
  .error-msg {
    margin-top: 0.4rem;
    display: inline-block;
    height: 1.3rem;
    color: ${getColor("red300")};
  }
  &.search-input {
    max-width: 19.2rem;
  }
  &.singleQA {
    max-width: 48rem;
  }
`;

const StyledLabel = styled.label`
  p {
    margin-bottom: 0.8rem;
  }
  &.search-input {
    display: none;
  }
`;

const StyledTextBox = styled.textarea`
  display: block;
  width: 100%;
  height: 16rem;
  font-size: 1.5rem;
  font-family: inherit;
  line-height: 2.3rem;
  padding: 1rem 1.6rem;
  outline: none;
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  transition: 0.2s all;
  ::placeholder {
    font-style: italic;
  }
  &.search-input {
    font-size: 1.3rem;
    padding: 0.8rem;
    ::placeholder {
      font-size: 1.3rem;
    }
  }
  :focus:enabled {
    background-color: ${getColor("white")};
    border: 1px solid ${getColor("blue300")};
    outline: none;
  }
  &.invalid:enabled {
    border: 1px solid ${getColor("red300")};
  }
  :disabled {
    border: 1px solid ${getColor("grey200")};
    background-color: ${getColor("grey200")};
  }
`;

const Input = ({
  placeholder,
  autoFocus,
  label,
  id,
  onType,
  type,
  name,
  valid = true,
  value,
  disabled = false,
  externalLabel,
  errMsg = "Car gone! Car gone!",
  className,
  // prependEl = false,
  appendEl = null,
}) => {
  return (
    <InputGroup className={className}>
      {externalLabel || (
        <StyledLabel htmlFor={id} className={className}>
          <HeaderXs>{label ? label : "No Label Passed In"}</HeaderXs>
        </StyledLabel>
      )}
      <StyledTextBox
        id={id}
        name={name || id || "name your Input"}
        onChange={onType}
        onBlur={onType}
        placeholder={placeholder || "Placeholder text"}
        type={type}
        value={value}
        className={`${!valid && "invalid"} ${className}`}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      {appendEl}
      <BodySm className="error-msg">{!valid && errMsg}</BodySm>
    </InputGroup>
  );
};

export default Input;
