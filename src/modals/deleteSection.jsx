import React from "react";

import DynamicSectionTemplate from "../modals/DynamicSectionTemplate";
import { HeaderMd, BodyMd } from "../styles/typography";
const DeleteSection = ({ id, onSubmit, onCancel, label, text }) => {
  const handleDelete = () => {
    onSubmit("delete", { id });
  };

  return (
    <DynamicSectionTemplate
      title="Delete This Section?"
      onSubmit={handleDelete}
      onCancel={onCancel}
    >
      <div className="section">
        <HeaderMd className="section-heading">{label}:</HeaderMd>
        <BodyMd className="section-body">{text}</BodyMd>
      </div>
    </DynamicSectionTemplate>
  );
};

export default DeleteSection;
