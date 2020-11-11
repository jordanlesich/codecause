import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { isSlugUnique } from "../actions/project";
import { useAuth } from "../Hooks/useAuth";
import { StepperContext } from "../contexts/stepperContext";
import FrameFactory from "./factories/frameFactory";

const Stepper = ({ submit }) => {
  const {
    currentStep,
    currentFrame,
    frame,
    step,
    steps,
    addData,
    currentInputValue,
    setValid,
    checkCompleted,
    stepperData,
    route,
  } = useContext(StepperContext);
  const history = useHistory();
  const { user } = useAuth();
  const [inputLoading, setInputLoading] = useState(false);

  const canMoveForward = () =>
    frame < currentStep.frames.length - 1 || step < steps.length - 1;

  const canMoveBackward = () => frame > 0 || step > 0;

  const goTo = (step, frame) => {
    history.push(`${route}/${step}/${frame}`);
  };

  const next = () => {
    if (canMoveForward()) {
      if (frame + 1 < currentStep.frames.length) {
        goTo(step, frame + 1);
      } else {
        goTo(step + 1, 0);
      }
    } else {
      return;
    }
  };
  const prev = () => {
    if (canMoveBackward()) {
      if (frame === 0) {
        const prevStep = steps[step - 1];
        goTo(step - 1, prevStep.frames.length - 1);
      } else {
        goTo(step, frame - 1);
      }
    } else {
      return;
    }
  };

  const finishStepper = () => {
    if (checkCompleted) {
      submit({ data: stepperData, user });
      console.log("submitting request");
    } else {
      console.error(
        "User was able to overide disable conditions to submit project to stepper."
      );
    }
  };

  const handleCheckUnique = async () => {
    //in future, this might need to support conditional
    //logic for other functions
    setInputLoading(true);
    try {
      const isUnique = await isSlugUnique(user.id, currentInputValue);
      if (isUnique) {
        addData();
        next();
      } else {
        setValid(false, "Users cannot have projects with the same name");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInputLoading(false);
    }
  };

  const finishStep = () => {
    if (currentFrame.input?.validations?.checkSlugUnique) {
      handleCheckUnique();
    } else {
      addData();
      next();
    }
  };

  return (
    <FrameFactory
      navFns={{ canMoveForward, canMoveBackward }}
      actions={{ finishStepper, finishStep, prev, next }}
      inputLoading={inputLoading}
      location={`/${step}/${frame}`}
    />
  );
};

export default Stepper;
