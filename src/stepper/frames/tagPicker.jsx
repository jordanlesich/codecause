import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import TagBox from "../../components/tagBox";
import TagCollector from "../../components/tagCollector";
import InputFactory from "../factories/inputFactory";
import { getTags } from "../../actions/tags";

import { Title, Question, Details } from "./elements";

// const availableTags = getTags();
const StyledTagPicker = styled.div`
  position: relative;
`;

const TagPicker = () => {
  const [availableTags, setTags] = useState(null);
  const {
    currentFrame,
    addTag,
    removeTag,
    initializeTagPicker,
    currentInputValue,
    next,
    addData,
  } = useContext(StepperContext);

  const { question, details, pickerRules, title, tag } = currentFrame;

  useEffect(() => {
    const fetchTags = async () => {
      setTags(await getTags());
    };
    if (currentInputValue === "") {
      initializeTagPicker(tag);
    }
    if (availableTags == null) {
      fetchTags();
    }
  }, []);

  const handleAdd = ({ value }) => {
    if (currentInputValue.includes(value)) return;
    else {
      addTag(value);
    }
  };

  return (
    <StyledTagPicker>
      <Title>{title}</Title>
      <Question htmlFor={tag} className="QA-label">
        {question}
      </Question>
      {details && <Details details={details}>{details}</Details>}

      <TagBox
        type={pickerRules.type}
        clickFn={handleAdd}
        limit={pickerRules.displayLimit}
        tagObj={availableTags && availableTags[pickerRules.type]}
        label={`common ${pickerRules.type} tags`}
      />

      <TagCollector
        type={pickerRules.type}
        clickFn={removeTag}
        limit={pickerRules.selectLimit}
        tags={currentInputValue}
      />
      {/* <InputFactory
        inputData={{
          ...input,
          fn: handleTyping,
          id: tag,
          tag: tag,
          className: "QA-input",
          placeholder: "Type here",
          value: currentInputValue,
        }}
      /> */}
    </StyledTagPicker>
  );
};

export default TagPicker;
