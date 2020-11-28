import React from "react";
import styled from "styled-components";

import Header from "../layouts/header";
import { widthQuery } from "../styles/responsive";

const CenteredTemplate = styled.main`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;

  @media ${widthQuery.tablet} {
    padding: 4rem;
  }
  @media ${widthQuery.mobileL} {
    padding: 2.4rem;
  }
  @media ${widthQuery.mobileS} {
    margin-top: 4rem;
    padding: 1.6rem;
  }
`;

const CenteredLayout = ({ children }) => {
  return (
    <>
      <Header singlePanel />
      <CenteredTemplate>{children}</CenteredTemplate>
    </>
  );
};

export default CenteredLayout;
