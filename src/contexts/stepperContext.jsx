import React, { useState, createContext } from "react";

import { instructions, createStepperData } from "../helpers/stepperHelper";

const steps = Object.freeze(instructions);

export const StepperContext = createContext();

//TODO memoize this setup so that we're not updating everything on one keystroke.

export const StepperProvider = ({ children }) => {
  const [stepperData, setStepperData] = useState(
    createStepperData(instructions)
  );

  const [step, setStep] = useState(0);
  const [frame, setFrame] = useState(0);

  //******************DATA Fns************************ */
  const currentInputValue = stepperData[step].answer;

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
    const newQA = { ...stepperData[step], answer: str };
    placeAnswer(newQA);
  };

  const addData = () => {
    const newQA = { ...stepperData[step], completed: true };
    placeAnswer(newQA);
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
  const removeTag = ({ value }) => {
    const newQA = {
      ...stepperData[step],
      answer: stepperData[step].answer.filter((tag) => {
        console.log(tag, value);
        return tag !== value;
      }),
    };

    placeAnswer(newQA);
  };

  //***********Navigational Fns******************//

  const currentStep = steps[step];
  const currentFrame = currentStep.frames[frame];

  const nextFrame = () => setFrame((currentFrame) => currentFrame + 1);
  const nextStep = () => setStep((currentStep) => currentStep + 1);

  const cannotMoveForward = () =>
    frame >= currentStep.frames.length - 1 && step >= steps.length - 1;
  const cannotMoveBackward = () => frame <= 0 && step <= 0;

  const next = () => {
    if (cannotMoveForward()) return;
    if (frame + 1 < currentStep.frames.length) {
      nextFrame();
    } else {
      nextStep();
      setFrame(0);
    }
  };
  const prev = () => {
    if (cannotMoveBackward()) return;
    if (frame === 0) {
      setStep((thisStep) => thisStep - 1);
      const prevStep = steps[step - 1];
      setFrame(prevStep.frames.length - 1);
    } else {
      setFrame((thisFrame) => thisFrame - 1);
    }
  };

  return (
    <StepperContext.Provider
      value={{
        steps,
        stepperData,
        currentInputValue,
        typeAnswer,
        addData,
        frame,
        setFrame,
        step,
        setStep,
        addTag,
        removeTag,
        initializeTagPicker,
        currentStep,
        currentFrame,
        prev,
        next,
        cannotMoveBackward,
        cannotMoveForward,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
