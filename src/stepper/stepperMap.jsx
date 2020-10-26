import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../contexts/stepperContext";
import Step from "./step";
import { getColor } from "../helpers/palette";

const StyledStepperMap = styled.div`
  height: 100%;
  background-color: ${getColor("grey200")};
  .map-box {
    padding: 4rem 2.4rem;
    list-style: none;
  }
`;

const StepperMap = () => {
  const { step, steps, stepperData } = useContext(StepperContext);

  return (
    <StyledStepperMap>
      <ul className="map-box">
        {steps.map((s, index) => (
          <Step
            stepData={s}
            key={s.tag}
            index={index}
            isSelected={index === step}
            completed={stepperData[index].completed}
          />
        ))}
      </ul>
    </StyledStepperMap>
  );
};

export default StepperMap;
