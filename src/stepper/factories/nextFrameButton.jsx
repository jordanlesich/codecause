import React, { useContext } from "react";
import styled from "styled-components";

import { useAuth } from "../../Hooks/useAuth";
import { createProject } from "../../actions/project";
import { StepperContext } from "../../contexts/stepperContext";
import Button from "../../components/button";

const NextFrameBtn = styled(Button)``;

const getBtnText = (type) => {
  const texts = {
    message: "Continue",
    singleQA: "Continue",
    tagPicker: "Continue",
    results: "Complete",
  };
  return texts[type];
};

const NextFrameButton = ({ next }) => {
  const { currentInputValue, addData, currentFrame, stepperData } = useContext(
    StepperContext
  );

  const { user } = useAuth();
  const { type } = currentFrame;

  const completeStep = (e) => {
    e.preventDefault();
    addData();
    next();
  };
  const completeForm = (e) => {
    // TODO: navigate to the finished project if successful
    createProject(stepperData, user);
  };
  const completeBtnFn = (type) => {
    const functions = {
      message: next,
      singleQA: completeStep,
      tagPicker: completeStep,
      results: completeForm,
    };
    return functions[type];
  };
  const disableBtnCondition = (type) => {
    const hasInputText = currentInputValue === "";
    const hasArrayItem =
      currentInputValue === "" || currentInputValue.length === 0;
    const allStepsCompleted = stepperData.every((step) => step.completed);

    const conditions = {
      message: false,
      singleQA: hasInputText,
      tagPicker: hasArrayItem,
      results: !allStepsCompleted,
    };

    return conditions[type];
  };
  return (
    <NextFrameBtn
      content={getBtnText(type)}
      height="3rem"
      width="10rem"
      className="primary"
      fn={completeBtnFn(type)}
      disabled={disableBtnCondition(type)}
    />
  );
};

export default NextFrameButton;
