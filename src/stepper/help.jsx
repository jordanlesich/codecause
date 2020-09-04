import React, { useState } from "react";
import styled from "styled-components";

import Button from "../components/button";
import { getColor } from "../helpers/palette";

const StyledHelpButton = styled(Button)``;
const TextPanel = styled.div`
  position: absolute;
  background-color: ${getColor("infoBG")};
  border: 1px solid ${getColor("infoLight")};
  transform: translateY(calc(-100%));
  font-size: 1.2rem;
  width: 30rem;
  position: absolute;
  padding: 1.2rem;
  font-weight: 400;
`;

const Help = ({ helpText, className }) => {
  //TODO Build click away listener
  const [textVisible, setTextVisible] = useState(false);
  const toggleTextVisible = (e) => {
    e.preventDefault();
    if (!helpText) return;
    setTextVisible(!textVisible);
  };

  return (
    <>
      {textVisible && <TextPanel>{helpText}</TextPanel>}
      <StyledHelpButton
        className={`${className} help-button info`}
        content="?"
        fontSize="1.5rem"
        height="3rem"
        width="3rem"
        radius="50%"
        fn={toggleTextVisible}
        disabled={!helpText}
      />
    </>
  );
};

export default Help;
