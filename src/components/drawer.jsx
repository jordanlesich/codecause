import React, { useState, useContext, useEffect, useRef } from "react";
import { X } from "react-feather";
import styled from "styled-components";

import { OverlayContext } from "../contexts/overlayContext";
import Button from "./button";
import { getColor } from "../helpers/palette";
import { widthQuery } from "../styles/responsive";
import {
  slideFromLeft,
  slideFromTop,
  slideOutLeft,
  slideOutTop,
} from "../helpers/anims";
import Backdrop from "./backdrop";

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
    transform: ${(props) =>
      props.open ? "translate3D(0, 0, 0)" : "translate3D(-100%, 0, 0)"};
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
    overflow-y: auto;
  }
`;

const Drawer = ({ children }) => {
  const { drawer, closeDrawer } = useContext(OverlayContext);
  const [anim, setAnim] = useState(drawer ? "in" : "out");

  const isOpen = useRef(drawer);

  useEffect(() => {
    const animIn = () => {
      setAnim("anim-in");
      isOpen.current = true;
      setTimeout(() => {
        setAnim("in");
      }, 200);
    };
    const animOut = () => {
      setAnim("anim-out");
      isOpen.current = false;
      setTimeout(() => {
        setAnim("out");
      }, 200);
    };
    if (drawer) {
      if (!isOpen.current) {
        animIn();
      } else {
        return;
      }
    } else {
      if (isOpen.current) {
        animOut();
      } else {
        return;
      }
    }

    return () => {
      clearInterval(animIn);
      clearInterval(animOut);
    };
  }, [drawer]);

  const handleCloseDrawer = () => {
    closeDrawer();
  };

  return (
    <>
      {anim !== "out" && (
        <Backdrop
          handleClick={handleCloseDrawer}
          fadeIn={anim === "anim-in" || anim === "in"}
        >
          <StyledSideMenu className={anim} open={drawer}>
            <div className="top-bar">
              <Button
                className="icon-button"
                iconButton={<X />}
                fn={handleCloseDrawer}
              />
            </div>
            <div className="main-bar">{children}</div>
          </StyledSideMenu>
        </Backdrop>
      )}
    </>
  );
};
export default Drawer;
