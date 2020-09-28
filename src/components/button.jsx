import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";
export const StyledButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;
  font-family: inherit;
  padding: 1.1rem 2.4rem;
  border-radius: 100px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s all;
  outline: none;

  &.primary {
    background-color: ${getColor("primary")};
    color: ${getColor("white")};
    :hover:enabled,
    :focus:enabled {
      background-color: ${getColor("blue300")};
    }
    :active:enabled {
      background-color: ${getColor("blue500")};
    }
    :disabled {
      background-color: ${getColor("blue000")};
      cursor: default;
    }
  }
  &.secondary {
    background-color: ${getColor("white")};
    border: 1px solid ${getColor("grey300")};
    color: ${getColor("font")};
    :hover:enabled,
    :focus:enabled {
      background-color: ${getColor("grey100")};
    }
    :active:enabled {
      background-color: ${getColor("grey200")};
    }
    :disabled {
      background-color: ${getColor("white")};
      border: 1px solid ${getColor("grey200")};
      cursor: default;
    }
  }
  &.text-button {
    background-color: transparent;
    padding: 1.1rem 0;
  }
  &.with-icon {
    padding: 1.1rem 1.8rem;
    .icon-wrapper {
      display: inline-block;
      margin: 0.2rem 0.5rem;
      transform: translate(-0.2rem, 0.2rem);
    }
  }
`;

const Button = ({
  className,
  fn,
  content,
  value,
  selected,
  type,
  disabled,
  //Icon size needs to specified in icon component
  //being passed in as props from the parent
  //1.7rem or 17px is reccomended
  withIcon = null,
}) => {
  return (
    <StyledButton
      onClick={fn}
      value={value}
      type={type}
      disabled={disabled}
      className={`${className} ${withIcon && "with-icon"}`}
    >
      {withIcon && <span className="icon-wrapper">{withIcon}</span>}
      {content}
    </StyledButton>
  );
};

export default Button;
