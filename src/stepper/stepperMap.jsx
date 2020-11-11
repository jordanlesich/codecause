import React, { useContext } from "react";
import styled from "styled-components";

import Break from "../components/break";
import { StepperContext } from "../contexts/stepperContext";

import Step from "./step";
import { getColor } from "../helpers/palette";
import { Overline } from "../styles/typography";
import FeedbackAbout from "../components/feedbackAbout";

const StyledStepperMap = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${getColor("grey200")};
  .map-box {
    padding: 1.6rem 2.4rem;
    list-style: none;
  }
  .steps-caption {
    margin-bottom: 1.6rem;
  }
  .top-list-section,
  .feedback-about-section {
    padding: 1.6rem 2.4rem;
  }
  .top-list-section,
  .feedback-about-section {
    button:first-child {
      margin-bottom: 0.8rem;
    }
  }
  .list-button {
    padding: 0;
    font-weight: 400;
    span.icon-wrapper {
      margin-right: 1.2rem;
    }
    svg {
      color: ${getColor("grey500")};
      transition: 0.2s color;
    }
    :hover {
      svg {
        color: ${getColor("grey600")};
      }
    }
  }
`;

const StepperMap = ({ topSection }) => {
  const { step, steps, stepperData, route } = useContext(StepperContext);

  return (
    <StyledStepperMap>
      {topSection && (
        <>
          <div className="top-list-section">{topSection}</div>{" "}
          <Break type="hard" />
        </>
      )}
      <ul className="map-box">
        <Overline className="steps-caption">steps</Overline>
        {steps.map((s, index) => (
          <Step
            stepData={s}
            key={s.tag}
            index={index}
            isSelected={index === step}
            completed={stepperData[index].completed}
            route={route}
          />
        ))}
      </ul>
      <FeedbackAbout />
    </StyledStepperMap>
  );
};

export default StepperMap;
