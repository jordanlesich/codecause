import React from "react";
import styled from "styled-components";
import { getColor } from "../helpers/palette";

const StyledDivider = styled.div`
  height: 1px;
  &.soft {
    border-bottom: 1px solid ${getColor("grey200")};
  }
  &.hard {
    border-bottom: 1px solid ${getColor("grey300")};
  }
  &.push-top {
    margin-top: auto;
  }
`;

const Break = ({ type, className, push }) => {
  return (
    <StyledDivider
      className={`${type} ${className} ${push === "top" && "push-top"}`}
    />
  );
};

export default Break;
