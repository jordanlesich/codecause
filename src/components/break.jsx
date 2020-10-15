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
`;

const Break = ({ type, className }) => {
  return <StyledDivider className={`${type} ${className}`} />;
};

export default Break;
