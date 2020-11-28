import React, { useState, useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../contexts/stepperContext";
import { BodySm, BoldText } from "../styles/typography";
import Step from "./step";
import { getColor } from "../helpers/palette";
import Backdrop from "../components/backdrop";
import Button from "../components/button";
import { ChevronDown, ChevronUp } from "react-feather";
import { slideFromTop, slideOutTop } from "../helpers/anims";
import { widthQuery } from "../styles/responsive";

const StyledIndicator = styled.div`
  position: relative;
  .indicator {
    z-index: 20;
    position: relative;
    background-color: ${getColor("grey200")};
    height: 5.6rem;
    display: flex;
    align-items: center;
    padding: 0 2.4rem;
    @media ${widthQuery.tablet} {
      padding: 0 4rem;
    }
    @media ${widthQuery.mobileL} {
      padding: 0 2.4rem;
    }
    @media ${widthQuery.mobileS} {
      padding: 0 1.6rem;
    }
  }
  .indicator-text {
  }
  .map-box {
    position: absolute;
    z-index: 10;
    top: 5.6rem;
    transform: translate3D(0, -100%, 0);
    width: 100%;
    background-color: ${getColor("grey200")};
    padding: 0 2.4rem 2.4rem 2.4rem;
    border-radius: 0 0 1.6rem 1.6rem;
    list-style: none;
    overflow-y: auto;
    @media ${widthQuery.tablet} {
      padding: 0 4rem 2.4rem 4rem;
    }
    @media ${widthQuery.mobileL} {
      padding: 0 2.4rem 2.4rem 2.4rem;
    }
    @media ${widthQuery.mobileS} {
      padding: 0 1.6rem 2.4rem 1.6rem;
    }
    &.in {
      transform: translate3D(0, 0, 0);
    }
    &.anim-in {
      animation: ${slideFromTop} 0.2s ease-in both;
    }
    &.anim-out {
      animation: ${slideOutTop} 0.2s ease-out both;
    }
    &.out {
      transform: translate3D(0, -100%, 0);
    }
  }
  .icon-button {
    margin-left: auto;
  }
`;

const getQAFrame = (step) => {
  return step.frames.find((frame) => frame.tag);
};

const StepIndicator = () => {
  const [mapBox, setMapBox] = useState(false);
  const [animState, setAnimState] = useState("out");

  // const isOpen = useRef(false);

  const handleToggle = () => {
    if (!mapBox) {
      setMapBox(true);
      setAnimState("anim-in");
      setTimeout(() => {
        setAnimState("in");
      }, 200);
    } else {
      setAnimState("anim-out");
      setTimeout(() => {
        setMapBox(false);
        setAnimState("out");
      }, 200);
    }
  };
  const { step, steps, currentStep, stepperData, route } = useContext(
    StepperContext
  );
  const QAframe = getQAFrame(currentStep);

  return (
    <StyledIndicator>
      <div className="indicator">
        <BodySm className="indicator-text">
          <BoldText>
            {step + 1} of {steps.length}
          </BoldText>
          : {QAframe.sideTitle}
        </BodySm>
        <Button
          className="icon-button"
          iconButton={mapBox ? <ChevronUp /> : <ChevronDown />}
          fn={handleToggle}
        />
      </div>
      {mapBox && (
        <Backdrop
          handleClick={handleToggle}
          fadeIn={animState === "anim-in" || animState === "in"}
        >
          <ul className={`map-box ${animState}`}>
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
        </Backdrop>
      )}
    </StyledIndicator>
  );
};

export default StepIndicator;
