import React, { useContext } from "react";
import styled from "styled-components";
import { Circle, CheckCircle } from "react-feather";

import { StepperContext } from "../contexts/stepperContext";
import { getColor } from "../helpers/palette";

const StyledStep = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  .upper-section {
    align-items: center;
    display: flex;
    font-size: 1.1rem;
  }
  .bottom-list {
    margin-left: 3.1rem;
    font-size: 0.9rem;
    list-style: none;
  }
  .step-icon {
    margin-right: 0.5rem;
    min-height: 2rem;
    min-width: 2rem;
  }
  .step-text {
    word-break: break-all;
  }
  .selected {
    color: ${getColor("secondary300")};
  }
`;

const getQAFrame = (step) => {
  return step.frames.find((frame) => frame.tag);
};

const Step = ({ stepData, isOpen, index }) => {
  const QAFrame = getQAFrame(stepData);
  const { stepperData, frame, step } = useContext(StepperContext);

  return (
    <StyledStep>
      <div className="upper-section">
        {stepperData[index].completed ? (
          <CheckCircle color="green" className="step-icon" size="2rem" />
        ) : (
          <Circle
            color={
              step === index ? getColor("secondary300") : getColor("secondary")
            }
            className="step-icon"
            size="2rem"
          />
        )}
        <p className={`step-text ${index === step && "selected"}`}>
          {QAFrame.title}
        </p>
      </div>
      {isOpen && (
        <ul className="bottom-list">
          {stepData.frames.map((f, i) => (
            <li
              className={`step-text ${i === frame && "selected"}`}
              key={f.title}
            >
              {f.title}
            </li>
          ))}
        </ul>
      )}
    </StyledStep>
  );
};

export default Step;
