import React, { useEffect, useContext, useState } from "react";
import kebabCase from "lodash.kebabcase";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import TagMaker from "../../components/tagMaker";
import TagCollector from "../../components/tagCollector";
import { getTags } from "../../actions/tags";
import { DisplayLg, BodyMd } from "../../styles/typography";

const StyledTagPicker = styled.div`
  position: relative;

  .create-tag {
    transform: translateY(0.25rem);
  }
`;

const TagPicker = () => {
  const [availableTags, setTags] = useState([]);
  const [status, setStatus] = useState("idle");

  const { currentFrame, addTag, removeTag, currentInputValue } = useContext(
    StepperContext
  );
  const { question, cardTitle, sideTitle, details, pickerRules } = currentFrame;

  useEffect(() => {
    const fetchTags = async () => {
      setStatus("loading");
      try {
        const response = await getTags(pickerRules.type, "tagPicker");
        setTags(response);
        setStatus("loaded");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };
    if (status === "idle") {
      fetchTags();
    }
  }, [availableTags, status, pickerRules.type]);

  const title = cardTitle || question || sideTitle;

  const handleAdd = (value) => {
    if (currentInputValue.includes(kebabCase(value))) return;
    else {
      addTag(kebabCase(value).replace("-", String.fromCharCode(0x2011)));
    }
  };

  const createTag = (string) => {
    if (string === "") return;
    handleAdd(string);
  };

  const checkLimit = () => {
    return currentInputValue.length >= pickerRules.selectLimit;
  };
  return (
    <StyledTagPicker>
      <DisplayLg className="title">{title}</DisplayLg>
      {details && <BodyMd className="details">{details}</BodyMd>}
      {
        <TagMaker
          tags={availableTags}
          addTag={createTag}
          tagType={pickerRules.type}
          disabled={checkLimit()}
        />
      }

      <TagCollector
        tagType={pickerRules.type}
        removeTag={removeTag}
        limit={pickerRules.selectLimit}
        tags={currentInputValue}
      />
    </StyledTagPicker>
  );
};

export default TagPicker;
