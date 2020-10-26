import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import InputFactory from "../factories/inputFactory";

import { DisplayLg, BodyMd, BodySm } from "../../styles/typography";

const StyledQA = styled.form``;

const SingleQA = ({ submitFn }) => {
  const {
    currentFrame,
    typeAnswer,
    step,
    stepperData,
    currentInputValue,
    currentInputValid,
  } = useContext(StepperContext);

  const { question, details, input, tag, help } = currentFrame;
  // const [info, setInfo] = useToggle(false);
  const handleTyping = (e) => {
    typeAnswer(e.target.value);
  };

  const completeStep = (e) => {
    e.preventDefault();
    submitFn();
  };

  return (
    <StyledQA onSubmit={completeStep}>
      <DisplayLg htmlFor={tag} className="title">
        {question}
      </DisplayLg>

      {details && <BodyMd className="details">{details}</BodyMd>}
      <InputFactory
        inputData={{
          ...input,
          onType: handleTyping,
          id: tag,
          externalLabel: true,
          tag: tag,
          valid: currentInputValid,
          errMsg: stepperData[step].error,
          className: "singleQA",
          placeholder: "Type here",
          autoFocus: true,
          value: currentInputValue,
        }}
      />
    </StyledQA>
  );
};

export default SingleQA;
