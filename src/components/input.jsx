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
  &.tag-search-dropdown,
  &.singleQA {
    max-width: 34.8rem;
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

const StyledInput = styled.input`
  display: block;
  width: 100%;
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
  onFocus,
  onBlur,
  onType,
  type,
  name,
  valid = true,
  value,
  disabled = false,
  externalLabel,
  errMsg = "Car gone! Car gone!",
  className,
  divClassName,
  inputClassName,
  labelClassName,
  appendEl = null,
}) => {
  return (
    <InputGroup className={divClassName || className}>
      {externalLabel || (
        <StyledLabel htmlFor={id} className={labelClassName || className}>
          <HeaderXs>{label ? label : "No Label Passed In"}</HeaderXs>
        </StyledLabel>
      )}
      <StyledInput
        id={id}
        onFocus={onFocus}
        onBlur={onBlur || onType}
        name={name || id || "name your Input"}
        onChange={onType}
        placeholder={placeholder || "Placeholder text"}
        type={type}
        value={value}
        className={`${!valid && "invalid"} ${inputClassName || className}`}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      {appendEl}
      <BodySm className="error-msg">{!valid && errMsg}</BodySm>
    </InputGroup>
  );
};

export default Input;
