import React from "react";
import styled from "styled-components";

import { fadeIn, fadeOut } from "../helpers/anims";
import { getColor } from "../helpers/palette";

const StyledSideMenu = styled.div`
  height: calc(100% - 5.6rem);
  width: 28rem;
  position: fixed;
  padding-top: 1.6rem;
  top: 5.6rem;
  background-color: ${getColor("grey200")};

  .in {
    opacity: 1;
  }
  .anim-in {
    animation: ${fadeIn} 0.2s ease-in both;
  }
  .anim-out {
    animation: ${fadeOut} 0.2s ease-out both;
  }
  .out {
    opacity: 0;
  }
  .menu-break {
    margin: 2.4rem;
  }
  .options-section {
    height: 100%;
  }
`;
const SideMenu = ({ options, currentOption }) => {
  // const switchOption = (val) => {
  //   setSelectedOption(options.find((option) => option.value === val));
  // };

  // const handleTabChange = (option) => {
  //   //do nothing if in the process of animation
  //   if (fadeAnim === "anim-in" || fadeAnim === "anim-out") return;
  //   //open first tab
  //   if (selectedOption === null && fadeAnim === "out") {
  //     setFadeAnim("anim-in");
  //     switchOption(option);
  //     setTimeout(() => {
  //       setFadeAnim("in");
  //     }, 200);
  //     return;
  //   }
  //   //if user clicked tab that is already open, close it.
  //   if (selectedOption.value === e.target.value && fadeAnim === "in") {
  //     setFadeAnim("anim-out");
  //     setTimeout(() => {
  //       setFadeAnim("out");
  //       setSelectedOption(null);
  //     }, 200);
  //     return;
  //   }
  //   //if user clicked a different tab than the one that is already open,
  //   //then fade out, then into the new tab
  //   if (selectedOption.value !== e.target.value && fadeAnim === "in") {
  //     setFadeAnim("anim-out");
  //     const form = e.target.value;
  //     setTimeout(() => {
  //       setFadeAnim("out");
  //       switchOption(null);
  //     }, 200);
  //     setTimeout(() => {
  //       setFadeAnim("anim-in");
  //       switchOption(form);
  //     }, 300);
  //     setTimeout(() => {
  //       setFadeAnim("in");
  //     }, 500);
  //   }
  // };
  return (
    <>
      <StyledSideMenu>
        <div className="options-section">{options[currentOption]}</div>
      </StyledSideMenu>
    </>
  );
};

export default SideMenu;
