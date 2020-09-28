import React from "react";
import { DisplayLg, HeaderLg, BodyMd } from "../styles/typography";

const Success = ({ data }) => {
  return (
    <>
      <DisplayLg className="form-title">Success!</DisplayLg>
      <HeaderLg>Welcome to CoLab</HeaderLg>
      {data && <BodyMd>{data}</BodyMd>}
    </>
  );
};

export default Success;
