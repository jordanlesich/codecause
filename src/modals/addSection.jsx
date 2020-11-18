import React, { useState } from "react";

import TextBox from "../components/textBox";
import Input from "../components/input";
import DynamicSectionTemplate from "../modals/DynamicSectionTemplate";

const AddSection = ({ onSubmit, onCancel, min = 1, max = 10, atPosition }) => {
  const [positionText, setPositionText] = useState(atPosition);
  const [labelText, setLabelText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const positionNum = parseInt(positionText);
  console.log(atPosition);

  const handleTypeBody = (e) => setBodyText(e.target.value);
  const handleTypeLabel = (e) => setLabelText(e.target.value);
  const handleTypePosition = (e) => setPositionText(e.target.value);

  const handleAddSection = () => {
    onSubmit("add", { index: positionNum, text: bodyText, label: labelText });
  };

  const getErrMsg = () => {
    if (positionNum > max) {
      return "The number you entered is larger than the amount of sections. Please enter a valid number";
    } else if (positionNum < min) {
      return "The number you enterred is smaller than 1. Nothing comes before position 1 (not zero indexed).";
    } else {
      return null;
    }
  };
  const getValid = () => {
    if (positionNum > max) {
      return false;
    } else if (positionNum < min) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <DynamicSectionTemplate
      title="Create Section"
      onSubmit={handleAddSection}
      onCancel={onCancel}
      disableSubmit={labelText === "" || bodyText === "" || !getValid()}
    >
      <Input
        label="At Position:"
        type="number"
        className="dynamic-section-input"
        value={positionText}
        onType={handleTypePosition}
        errMsg={getErrMsg()}
        valid={getValid()}
      />
      <Input
        label="Section Label"
        className="dynamic-section-input"
        value={labelText}
        onType={handleTypeLabel}
      />
      <TextBox
        label="Section Text"
        className="dynamic-section-input"
        value={bodyText}
        onType={handleTypeBody}
      />
    </DynamicSectionTemplate>
  );
};

export default AddSection;
