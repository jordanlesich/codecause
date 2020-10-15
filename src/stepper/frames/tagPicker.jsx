import React, { useEffect, useContext, useState } from "react";
import kebabCase from "lodash.kebabcase";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import TagBox from "../../components/tagBox";
import TagCollector from "../../components/tagCollector";
import Button from "../../components/button";
import Input from "../../components/input";
import { getTags } from "../../actions/tags";

import { Title, Question, Details } from "./elements";

// const availableTags = getTags();
const StyledTagPicker = styled.div`
  position: relative;
  .create-tag {
    transform: translateY(0.25rem);
  }
`;

const TagPicker = () => {
  const [availableTags, setTags] = useState(null);
  const [inputText, setInputText] = useState("");
  const {
    currentFrame,
    addTag,
    removeTag,
    initializeTagPicker,
    currentInputValue,
  } = useContext(StepperContext);

  const {
    question,
    details,
    pickerRules,
    title,
    tag,
    showTitle,
  } = currentFrame;

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
  }, [currentInputValue, availableTags, tag, initializeTagPicker]);

  const handleAdd = ({ value }) => {
    if (currentInputValue.includes(kebabCase(value))) return;
    else {
      addTag(kebabCase(value).replace("-", String.fromCharCode(0x2011)));
    }
  };
  const createTag = () => {
    if (inputText === "") return;
    handleAdd({ value: inputText });
    setInputText("");
  };
  const handleTyping = (e) => {
    setInputText(e.target.value);
  };
  const checkLimit = () => {
    if (!Array.isArray(currentInputValue)) return;
    else {
      return currentInputValue.length >= pickerRules.selectLimit;
    }
  };

  return (
    <StyledTagPicker>
      {showTitle && <Title>{title}</Title>}
      <Question htmlFor={tag} className="QA-label">
        {question}
      </Question>
      {details && <Details details={details}>{details}</Details>}
      {Array.isArray(currentInputValue) && (
        <Details>
          Tag {currentInputValue.length} of {pickerRules.selectLimit}
        </Details>
      )}
      <Input
        label="Create Tag:"
        fn={handleTyping}
        value={inputText}
        id="createTagInput"
        disabled={checkLimit()}
      />
      <Button
        fn={createTag}
        content="Create"
        className="success create-tag"
        disabled={inputText === "" || checkLimit()}
      />
      <TagBox
        type={pickerRules.type}
        clickFn={handleAdd}
        limit={pickerRules.displayLimit}
        tagObj={availableTags && availableTags[pickerRules.type]}
        label={`common ${pickerRules.type} tags`}
        disabled={checkLimit()}
      />
      <TagCollector
        type={pickerRules.type}
        clickFn={removeTag}
        limit={pickerRules.selectLimit}
        tags={currentInputValue}
      />
    </StyledTagPicker>
  );
};

export default TagPicker;
