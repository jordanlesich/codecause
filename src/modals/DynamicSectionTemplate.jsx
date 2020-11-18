import React from "react";

import Button from "../components/button";
import { DisplaySm } from "../styles/typography";
import { ModalBox, ButtonBox } from "../components/staticElements";

const DynamicSectionTemplate = ({
  title,
  children,
  disableSubmit = false,
  onSubmit,
  onCancel,
}) => {
  return (
    <ModalBox>
      <DisplaySm className="display">{title}</DisplaySm>
      {children}
      <ButtonBox>
        <Button className="secondary" content="Cancel" fn={onCancel} />
        <Button
          className="primary"
          content={"Save"}
          fn={onSubmit}
          disabled={disableSubmit}
        />
      </ButtonBox>
    </ModalBox>
  );
};

export default DynamicSectionTemplate;
