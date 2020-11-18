import React from "react";
import styled from "styled-components";

import { OverlayProvider } from "../contexts/overlayContext";
import Modal from "../components/modal";
import Header from "../layouts/header";

const StyleTemplate = styled.main`
  display: grid;
  min-height: 100%;
  grid-template-columns: 32rem 8rem minmax(60rem, 80rem) auto;
  grid-template-rows: 5.6rem auto;
  transition: 0.2s all;
`;
const MainSpace = styled.main`
  width: 100%;
  margin-top: 4rem;
  /* margin-left: 4rem; */
  grid-column: 3/4;
  grid-row: 2;
`;

const SideSpace = styled.aside`
  width: 100%;
  grid-column: 1;
  grid-row: 2;
`;

const Layout = ({ children, sideMenu }) => {
  return (
    <OverlayProvider>
      <StyleTemplate>
        <Modal />
        <Header />
        <SideSpace>{sideMenu}</SideSpace>
        <MainSpace>{children}</MainSpace>
      </StyleTemplate>
    </OverlayProvider>
  );
};

export default Layout;
