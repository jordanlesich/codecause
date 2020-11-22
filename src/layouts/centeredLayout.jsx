import React from "react";
import styled from "styled-components";
import { useAuth } from "../Hooks/useAuth";

import Header from "../layouts/header";

const CenteredTemplate = styled.main`
  display: flex;
  align-items: flex-start;
  margin-top: 10vh;
  justify-content: center;
`;

const CenteredLayout = ({ children }) => {
  return (
    <>
      <Header />
      <CenteredTemplate>{children}</CenteredTemplate>
    </>
  );
};

export default CenteredLayout;
