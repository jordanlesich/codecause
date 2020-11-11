import React, { useState, createContext } from "react";

import { createStepperData } from "../helpers/stepperHelper";
export const StepperContext = createContext();

//TODO memoize this setup so that we're not updating everything on one keystroke.

export const StepperProvider = ({ children, step, frame, steps, route }) => {
  const [stepperData, setStepperData] = useState(createStepperData(steps));

  //******************DATA Fns************************ */
  const currentInputValue = stepperData[step].answer;
  const currentInputValid = stepperData[step].valid;

  const currentStep = steps[step];
  const currentFrame = currentStep.frames[frame];
  //TODO, refactor. I went for simplicity and safety over
  //performance. Should refactor to something that updates state
  //only when the user clicks to submit or to another page.
  const placeAnswer = (data) => {
    setStepperData((currentData) => [
      ...currentData.slice(0, step),
      data,
      ...currentData.slice(step + 1),
    ]);
  };
  const typeAnswer = (str) => {
    if (stepperData[step].error) {
      const newQA = {
        ...stepperData[step],
        answer: str,
        valid: true,
      };
      placeAnswer(newQA);
    } else {
      const newQA = { ...stepperData[step], answer: str };
      placeAnswer(newQA);
    }
  };

  const addData = () => {
    const newQA = { ...stepperData[step], completed: true };
    placeAnswer(newQA);
  };

  const checkCompleted = () => {
    return stepperData.every((step) => step.completed);
  };

  const setValid = (valid, errMsg) => {
    if (valid) {
      placeAnswer({
        ...stepperData[step],
        valid: true,
      });
    } else {
      placeAnswer({
        ...stepperData[step],
        valid: false,
        error: errMsg,
      });
    }
  };
  //***********TagPicker Fns******************//

  const initializeTagPicker = (tag) => {
    const newQA = { ...stepperData[step], answer: [] };
    placeAnswer(newQA);
  };

  const addTag = (str) => {
    const newQA = {
      ...stepperData[step],
      answer: [...stepperData[step].answer, str],
    };
    placeAnswer(newQA);
  };
  const removeTag = (str) => {
    const newQA = {
      ...stepperData[step],
      answer: stepperData[step].answer.filter((tag) => {
        return tag !== str;
      }),
    };

    placeAnswer(newQA);
  };

  //***********Navigational Fns******************//

  return (
    <StepperContext.Provider
      value={{
        steps,
        route,
        stepperData,
        currentInputValue,
        currentInputValid,
        typeAnswer,
        addData,
        setValid,
        frame,
        step,
        addTag,
        checkCompleted,
        removeTag,
        initializeTagPicker,
        currentStep,
        currentFrame,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
