import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import InputFactory from "../factories/inputFactory";

import { Title, Question, Details } from "./elements";

const StyledQA = styled.form`
  position: relative;
`;

const SingleQA = () => {
  const {
    currentFrame,
    typeAnswer,
    currentInputValue,
    next,
    addData,
  } = useContext(StepperContext);

  const { question, details, input, tag, title } = currentFrame;
  const handleTyping = (e) => {
    typeAnswer(e.target.value);
  };

  const completeStep = (e) => {
    e.preventDefault();
    addData();
    next();
  };

  return (
    <StyledQA onSubmit={completeStep}>
      <Title>{title}</Title>
      <Question htmlFor={tag} className="QA-label">
        {question}
      </Question>
      {details && <Details details={details}>{details}</Details>}
      <InputFactory
        inputData={{
          ...input,
          fn: handleTyping,
          id: tag,
          tag: tag,
          className: "QA-input",
          placeholder: "Type here",
          value: currentInputValue,
        }}
      />
    </StyledQA>
  );
};

export default SingleQA;
