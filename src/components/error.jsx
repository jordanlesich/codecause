import React from "react";
import styled from "styled-components";

import Button from "./button";
import { DisplayLg, HeaderLg, HeaderMd } from "../styles/typography";

const StyledErrorPanel = styled.div`
  h2 {
    margin-bottom: 2.4rem;
    text-align: center;
  }

  .try-again-button {
    margin: 4rem auto;
  }
`;

const Error = ({ tryAgain, errMsg }) => {
  return (
    <StyledErrorPanel>
      <DisplayLg className="form-title">Whoops!</DisplayLg>
      <HeaderLg>Looks like there was an error!</HeaderLg>
      <HeaderMd className="error-text">{errMsg}</HeaderMd>
      <div className="buttons-section">
        {tryAgain && (
          <Button
            content="Try again"
            fn={tryAgain}
            className="secondary try-again-button"
          />
        )}
      </div>
    </StyledErrorPanel>
  );
};

export default Error;
