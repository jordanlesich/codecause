import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import Message from "../frames/message";
import SingleQA from "../frames/singleQA";
import Spinner from "../../components/spinner";
import TagPicker from "../frames/tagPicker";
import Results from "../frames/results";
import Button from "../../components/button";

// import NextFrameButton from "../factories/nextFrameButton";

const FrameTemplate = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 80rem;
  width: 100%;
  .button-section {
    display: flex;
    margin-top: 4rem;
    margin-bottom: 2.4rem;
    button {
      margin-right: 1.6rem;
    }
  }
  .input-loading-spinner {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .title {
    margin-bottom: 0.8rem;
  }
  .details {
    margin-bottom: 2.4rem;
  }
`;

const getFrame = (type, submitFn, key) => {
  switch (type) {
    case "message":
      return <Message key={key} />;
    case "singleQA":
      return <SingleQA key={key} submitFn={submitFn} />;
    case "tagPicker":
      return <TagPicker key={key} submitFn={submitFn} />;
    case "results":
      return <Results key={key} />;
    default:
      return <p>error</p>;
  }
};

const FrameFactory = ({ actions, inputLoading, location }) => {
  const { currentFrame, checkCompleted, currentInputValue } = useContext(
    StepperContext
  );
  const { finishStep, finishStepper, next, prev } = actions;
  const nextBtnFn = {
    message: next,
    singleQA: finishStep,
    tagPicker: finishStep,
    results: finishStepper,
  };
  const blockContinueBtn = (type, currentVal) => {
    if (type === "message") {
      return false;
    } else if (type === "singleQA") {
      return currentVal.trim() === "";
    } else if (type === "tagPicker") {
      return !currentVal.length;
    } else if (type === "results") {
      const isCompleted = checkCompleted();
      console.log(isCompleted);
      return !isCompleted;
    } else {
      console.error(
        "FrameFactory continue button blocker recieved incorrect params"
      );
    }
  };

  return (
    <FrameTemplate>
      {getFrame(currentFrame.type, nextBtnFn[currentFrame.type], location)}
      <div className="button-section">
        <Button content="Back" fn={prev} className="secondary" />
        <Button
          className="primary"
          fn={nextBtnFn[currentFrame.type]}
          content={currentFrame.type === "results" ? "Complete" : "Continue"}
          disabled={blockContinueBtn(currentFrame.type, currentInputValue)}
        />
        {inputLoading && (
          <Spinner radius="2.4rem" className="input-loading-spinner" />
        )}
      </div>
    </FrameTemplate>
  );
};

export default FrameFactory;
