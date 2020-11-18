import React, { useState } from "react";

import Input from "../components/input";
import DynamicSectionTemplate from "../modals/DynamicSectionTemplate";

const MoveSection = ({ onSubmit, onCancel, min = 1, max = 10, section }) => {
  const [inputText, setInputText] = useState("1");
  const inputNum = parseInt(inputText);

  console.log(section);
  const handleAddSection = () => {
    onSubmit("move", { index: inputNum, selectedSection: section });
  };
  const handleTyping = (e) => setInputText(e.target.value);

  const getErrMsg = () => {
    if (inputNum > max) {
      return "The number you entered is larger than the amount of sections. Please enter a valid number";
    } else if (inputNum < min) {
      return "The number you enterred is smaller than 1. Nothing comes before position 1 (not zero indexed).";
    } else {
      return null;
    }
  };
  const getValid = () => {
    if (inputNum > max) {
      return false;
    } else if (inputNum < min) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <DynamicSectionTemplate
      title="Move to Position"
      onSubmit={handleAddSection}
      onCancel={onCancel}
      disableSubmit={!getValid()}
    >
      <Input
        externalLabel
        type="number"
        className="dynamic-section-input"
        value={inputText}
        onType={handleTyping}
        errMsg={getErrMsg()}
        valid={getValid()}
      />
    </DynamicSectionTemplate>
  );
};

export default MoveSection;
