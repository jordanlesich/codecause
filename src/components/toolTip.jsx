import React from "react";
import styled from "styled-components";
import { getColor } from "../helpers/palette";

const ToolTipPanel = styled.div`
  position: absolute;
  background-color: ${getColor("dark")};
  color: ${getColor("white")};
  top: 0;
  right: 0;
  padding: 1.6rem;
  z-index: 20;

  box-shadow: 3px 2px 2px 0px rgba(0, 0, 0, 0.37);
`;

const ToolTip = ({ children }) => {
  return <ToolTipPanel>{children}</ToolTipPanel>;
};

export default ToolTip;
