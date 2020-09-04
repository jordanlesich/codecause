import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../contexts/stepperContext";
import Step from "./step";
import { getColor } from "../helpers/palette";

const StyledStepperMap = styled.div`
  grid-column: 1;
  grid-row: 1;
  padding: 4rem 0;
  background-color: ${getColor("dark")};
  color: ${getColor("secondary")};

  .step-indicator {
    display: flex;
    font-size: 1.3rem;
    margin: 2rem auto 1.5rem auto;
    width: 80%;
    color: ${getColor("secondary300")};
  }
  .map-box {
    margin: 0 auto;
    width: 80%;
    list-style: none;
  }
`;

const StepperMap = () => {
  const { step, steps } = useContext(StepperContext);

  return (
    <StyledStepperMap>
      <div className="step-indicator">
        <p>
          Step {step + 1} of {steps.length}
        </p>
      </div>
      <ul className="map-box">
        {steps.map((s, index) => (
          <Step
            stepData={s}
            key={s.tag}
            index={index}
            isOpen={index === step}
          />
        ))}
      </ul>
    </StyledStepperMap>
  );
};

export default StepperMap;
