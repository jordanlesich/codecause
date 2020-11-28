import React from "react";
import styled from "styled-components";

import Modal from "../components/modal";
import Header from "../layouts/header";
import { widthQuery } from "../styles/responsive";

const StyleTemplate = styled.main`
  display: grid;
  min-height: 100%;
  width: 100%;
  grid-template-columns: 32rem 8rem minmax(60rem, 80rem) auto;
  grid-template-rows: 5.6rem auto;
  transition: 0.2s all;
  @media ${widthQuery.laptop} {
    grid-template-columns: 28rem 4rem minmax(60rem, 80rem) auto;
  }
  @media ${widthQuery.tablet} {
    position: relative;
    margin-top: 5.6rem;
    display: block;
  }
`;
const MainSpace = styled.main`
  width: 100%;
  grid-column: 3/4;
  grid-row: 2;
  padding: 4rem;
  z-index: 0;
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
  /* height: 100%; */
  @media ${widthQuery.tablet} {
    /* position: fixed; */
    height: 100%;
    width: 100%;
    z-index: 20;
  }
`;

const Layout = ({ children, sideMenu, indicator = null }) => {
  return (
    <StyleTemplate>
      <Modal />
      <Header />
      {indicator}
      <SideSpace>{sideMenu}</SideSpace>
      <MainSpace>{children}</MainSpace>
    </StyleTemplate>
  );
};

export default Layout;
