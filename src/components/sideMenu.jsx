import React from "react";
import styled from "styled-components";

import { useViewport } from "../Hooks/useViewport";
import Drawer from "./drawer";
import { getColor } from "../helpers/palette";
import { widthBreakpoint, widthQuery } from "../styles/responsive";
import {
  slideFromLeft,
  slideFromTop,
  slideOutLeft,
  slideOutTop,
} from "../helpers/anims";

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
    position: fixed;
    top: 5.6rem;
    left: 0;
    /* height: 100%; */
    transform: translate3D(-100%, 0, 0);
    padding-left: 1rem;
    padding-right: 1rem;
    width: 32rem;
    z-index: 20;
    &.in {
      transform: translate3D(0, 0, 0);
    }
    &.anim-in {
      animation: ${slideFromLeft} 0.2s ease-in both;
    }
    &.anim-out {
      animation: ${slideOutLeft} 0.2s ease-out both;
    }
    &.out {
      transform: translate3D(-100%, 0, 0);
    }
  }
  @media ${widthQuery.mobileL} {
    width: 100%;
    top: 0;
    transform: translate3D(0, -120%, 0);
    &.in {
      transform: translate3D(0, 0, 0);
    }
    &.anim-in {
      animation: ${slideFromTop} 0.2s ease-in both;
    }
    &.anim-out {
      animation: ${slideOutTop} 0.2s ease-out both;
    }
    &.out {
      transform: translate3D(0, -100%, 0);
    }
  }
  .top-bar {
    height: 4rem;
    padding: 0 2.4rem;
  }
  .main-bar {
    height: calc(100% - 4rem);
  }
`;

const SideMenu = ({ options, currentOption }) => {
  const { width } = useViewport();

  return (
    <>
      {width > widthBreakpoint.tablet ? (
        <StyledSideMenu>{options[currentOption]}</StyledSideMenu>
      ) : (
        <Drawer> {options[currentOption]}</Drawer>
      )}
    </>
  );
};

export default SideMenu;
