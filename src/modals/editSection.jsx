import React, { useState } from "react";

import TextBox from "../components/textBox";
import Input from "../components/input";
import DynamicSectionTemplate from "../modals/DynamicSectionTemplate";

const EditSection = ({ onSubmit, onCancel, label, text, id }) => {
  const [labelText, setLabelText] = useState(label);
  const [bodyText, setBodyText] = useState(text);

  const handleTypeBody = (e) => {
    setBodyText(e.target.value);
  };
  const handleTypeLabel = (e) => setLabelText(e.target.value);

  const handleEditSection = () => {
    onSubmit("edit", { id, text: bodyText, label: labelText });
  };

  return (
    <DynamicSectionTemplate
      title="Edit Section"
      onSubmit={handleEditSection}
      onCancel={onCancel}
      disableSubmit={labelText === "" && bodyText === ""}
    >
      <Input
        label="Edit Label"
        className="dynamic-section-input"
        value={labelText}
        onType={handleTypeLabel}
      />
      <TextBox
        label="Edit Text"
        className="dynamic-section-input"
        value={bodyText}
        onType={handleTypeBody}
      />
    </DynamicSectionTemplate>
  );
};

export default EditSection;
