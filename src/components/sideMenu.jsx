import React from "react";
import { X } from "react-feather";
import styled from "styled-components";

import { getColor } from "../helpers/palette";
import { widthQuery } from "../styles/responsive";
import Button from "./button";

const StyledSideMenu = styled.div`
  height: calc(100% - 5.6rem);
  width: 32rem;
  position: fixed;
  padding-top: 1.6rem;
  top: 5.6rem;
  background-color: ${getColor("grey200")};
  @media ${widthQuery.laptop} {
    width: 28rem;
  }
  @media ${widthQuery.tablet} {
    position: relative;
    width: 100%;
    top: 0;
  }
  .top-bar {
    height: 4rem;
    padding: 0 2.4rem;
  }
`;
const SideMenu = ({ options, currentOption, closeDrawer }) => {
  return (
    <>
      <StyledSideMenu>
        <div className="top-bar">
          <Button className="icon-button" iconButton={<X />} fn={closeDrawer} />
        </div>
        <div className="options-section">{options[currentOption]}</div>
      </StyledSideMenu>
    </>
  );
};

export default SideMenu;
