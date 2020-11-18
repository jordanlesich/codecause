import React from "react";

import Button from "../components/button";
import { DisplaySm, BodyMd } from "../styles/typography";
import { ButtonBox, ModalBox } from "../components/staticElements";
import Break from "../components/break";

const Warning = ({ title = "Warning", body, primaryFn, secondaryFn }) => {
  return (
    <ModalBox>
      <DisplaySm className="space-bottom-sm">{title}</DisplaySm>
      <Break type="soft" className="space-bottom" />
      <BodyMd className="space-bottom">{body}</BodyMd>
      <ButtonBox>
        <Button className="secondary" content="Cancel" fn={secondaryFn} />
        <Button className="warning" content="Understood" fn={primaryFn} />
      </ButtonBox>
    </ModalBox>
  );
};

export default Warning;
