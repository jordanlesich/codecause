import React from "react";
import Button from "./button";
import { DisplayLg, HeaderLg, BodyMd } from "../styles/typography";

const Error = ({ tryAgain, errMsg }) => {
  return (
    <>
      <DisplayLg className="form-title">Whoops!</DisplayLg>
      <HeaderLg>Looks like there was an error!</HeaderLg>
      {errMsg && <BodyMd>{errMsg}</BodyMd>}
      <div className="buttons-section">
        {tryAgain && (
          <Button content="Try again" fn={tryAgain} className="primary" />
        )}
      </div>
    </>
  );
};

export default Error;
