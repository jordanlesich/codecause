import React from "react";

import Spinner from "../components/spinner";
import { DisplayLg, BodyMd } from "../styles/typography";

const LoggingIn = () => {
  return (
    <>
      <DisplayLg>Logging In</DisplayLg>
      <BodyMd>If this takes longer than 10 seconds, click HERE</BodyMd>
      <Spinner />
    </>
  );
};

export default LoggingIn;
