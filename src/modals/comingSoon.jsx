import React from "react";

import Button from "../components/button";
import { DisplaySm, BodyMd } from "../styles/typography";
import { ButtonBox, ModalBox } from "../components/staticElements";
import Break from "../components/break";

const ComingSoon = ({ title = "Coming Soon", body, primaryFn }) => {
  return (
    <ModalBox>
      <DisplaySm className="display">{title}</DisplaySm>
      <Break type="soft" className="display" />
      <BodyMd className="display">{body}</BodyMd>
      <Break type="soft" className="display" />
      <ButtonBox>
        <Button className="secondary" content="Send feedback" />
        <Button className="primary" content="Good" fn={primaryFn} />
      </ButtonBox>
    </ModalBox>
  );
};

export default ComingSoon;
