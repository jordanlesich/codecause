import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import { getColor } from "../../helpers/palette";
import { Title, Question, Details } from "./elements";

const ResultsFrame = styled.div`
  /* position: relative; */

  ul {
    list-style: none;
  }
  .QA-list-item {
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid ${getColor("lightBorder")};
  }
`;

const Results = () => {
  const { stepperData, currentFrame } = useContext(StepperContext);
  return (
    <ResultsFrame>
      {currentFrame.showTitle && <Question>{currentFrame.title}</Question>}
      <ul>
        {stepperData.map((step) => {
          return (
            <li key={step.tag} className="QA-list-item">
              <Title>{step.question}</Title>
              {step.answer ? (
                <Details>{step.answer}</Details>
              ) : (
                <Details>{"Answer required"}</Details>
              )}
            </li>
          );
        })}
      </ul>
    </ResultsFrame>
  );
};

export default Results;
