import React from "react";
import styled from "styled-components";

import Header from "../layouts/header";

const StyleTemplate = styled.main`
  display: grid;
  min-height: 100%;
  grid-template-columns: 28rem 1fr minmax(60rem, 72rem) 4fr;
  grid-template-rows: 5.6rem auto;
  transition: 0.2s all;
`;
const MainSpace = styled.main`
  width: 100%;
  margin-top: 4rem;
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
    <>
      <StyleTemplate>
        <Header />
        <SideSpace>{sideMenu}</SideSpace>
        <MainSpace>{children}</MainSpace>
      </StyleTemplate>
    </>
  );
};

export default Layout;
