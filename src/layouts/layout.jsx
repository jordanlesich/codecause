import React from "react";
import styled from "styled-components";

import { OverlayProvider } from "../contexts/overlayContext";
import Modal from "../components/modal";
import Header from "../layouts/header";
import { widthQuery } from "../styles/responsive";
import { useState } from "react";
import { set } from "date-fns/esm";
import SideMenu from "../components/sideMenu";

const StyleTemplate = styled.main`
  display: grid;
  min-height: 100%;
  grid-template-columns: 32rem 8rem minmax(60rem, 80rem) auto;
  grid-template-rows: 5.6rem auto;
  transition: 0.2s all;
  @media ${widthQuery.laptop} {
    grid-template-columns: 28rem 4rem minmax(60rem, 80rem) auto;
  }
  @media ${widthQuery.tablet} {
    position: relative;
    display: block;
  }
`;
const MainSpace = styled.main`
  width: 100%;
  grid-column: 3/4;
  grid-row: 2;
  padding: 4rem;
  @media ${widthQuery.tablet} {
    max-width: 72rem;
    padding: 4rem;
  }
  @media ${widthQuery.mobileL} {
    max-width: 72rem;
    padding: 2.4rem;
  }
  @media ${widthQuery.mobileS} {
    padding: 1.6rem;
  }
`;

const SideSpace = styled.aside`
  width: 100%;
  grid-column: 1;
  grid-row: 2;
  @media ${widthQuery.tablet} {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 20;
  }
  &.in {
    opacity: 1;
    top: 0;
  }
  &.anim-in {
    /* animation:  0.3s ease-out both; */
  }
  &.anim-out {
    /* animation:  0.3s ease-out both; */
  }
  &.out {
    opacity: 0;
    top: -100%;
  }
`;

const Layout = ({ children, sideMenu }) => {
  const [topDrawer, setTopDrawer] = useState(false);

  const openDrawer = () => {
    setTopDrawer(true);
  };
  const closeDrawer = () => {
    setTopDrawer(false);
  };
  return (
    <OverlayProvider>
      <StyleTemplate>
        <Modal />
        <Header openDrawer={openDrawer} />
        <SideSpace className={topDrawer ? "in" : "out"}>
          {React.cloneElement(sideMenu, { closeDrawer })}
        </SideSpace>
        <MainSpace>{children}</MainSpace>
      </StyleTemplate>
    </OverlayProvider>
  );
};

export default Layout;
