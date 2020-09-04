import React from "react";
import styled from "styled-components";

import { fadeIn, fadeOut } from "../helpers/anims";

const BackgroundStyle = styled.div`
  /* TODO: Position fixed will not work on iOS, will need to think of a solution when the time comes.*/
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 15;
  background-color: ${(props) => props.bgColor};
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)}
    ${(props) => props.duration} ease-in-out both;
`;

const Backdrop = ({ fadeIn, children, duration, bgColor }) => {
  return (
    <BackgroundStyle
      fadeIn={fadeIn}
      duration={duration || "0.2s"}
      bgColor={bgColor || "#ffffff"}
    >
      {children}
    </BackgroundStyle>
  );
};

export default Backdrop;
