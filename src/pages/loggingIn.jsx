import React from "react";
import styled from "styled-components";

import Spinner from "../components/spinner";
import CenteredLayout from "../layouts/centeredLayout";
import { BodyMd } from "../styles/typography";

const SpinnerDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .loading {
    margin-top: 3.2rem;
  }
`;
const LoggingIn = () => {
  return (
    <CenteredLayout>
      <SpinnerDisplay>
        <Spinner radius="20vw" />
        <BodyMd className="loading">Loading</BodyMd>
      </SpinnerDisplay>
    </CenteredLayout>
  );
};

export default LoggingIn;
