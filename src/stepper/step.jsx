import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Circle, CheckCircle } from "react-feather";

import Button from "../components/button";
import { StepperContext } from "../contexts/stepperContext";
import { getColor } from "../helpers/palette";

const StyledStep = styled.li`
  margin-bottom: 1.2rem;
  .step-box {
    display: flex;
  }
  .selected {
    font-weight: 700;
  }
  .frames {
    list-style: none;
    margin-left: 3.2rem;
    margin-top: 0.8rem;
  }
  .frame-item {
    margin-bottom: 0.8rem;
  }
`;

const getQAFrame = (step) => {
  return step.frames.find((frame) => frame.tag);
};
const getIcon = (isSelected, isCompleted) => {
  if (!isSelected && !isCompleted) {
    return <Circle color={getColor("grey400")} size="2rem" />;
  } else if ((!isSelected && isCompleted) || (isSelected && isCompleted)) {
    return <CheckCircle color="green" size="2rem" />;
  } else if (isSelected && !isCompleted) {
    // return <FilledCircle className="step-icon" size="2rem" />;
    //for now, don't deal with custom SVGs. This will do.
    return (
      <Circle className="step-icon" color={getColor("grey600")} size="2rem" />
    );
  } else {
    console.error(
      "Factory function for Step Map List's Icon item didn't recieve the correct arguments"
    );
  }
};

const Step = ({ stepData, isSelected, index, completed, route }) => {
  const QAFrame = getQAFrame(stepData);
  const history = useHistory();
  const { frame } = useContext(StepperContext);
  const goToStep = () => {
    console.log(`${route}/${index}/0`);
    history.push(`${route}/${index}/0`);
  };
  const goToFrame = (frameIndex) => {
    history.push(`${route}/${index}/${frameIndex}`);
  };

  return (
    <StyledStep>
      <Button
        className={`step-button ${isSelected && "selected"}`}
        withIcon={getIcon(isSelected, completed)}
        content={QAFrame.sideTitle}
        fn={goToStep}
      />
      {isSelected && stepData.frames.length > 1 && (
        <ul className="frames">
          {stepData.frames.map((f, i) => (
            <li className="frame-item" key={f.sideTitle}>
              <Button
                content={f.sideTitle}
                className={`step-button ${i === frame && "selected"}`}
                fn={() => goToFrame(i)}
              />
            </li>
          ))}
        </ul>
      )}
    </StyledStep>
  );
};

export default Step;
