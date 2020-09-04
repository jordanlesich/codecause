import React, { useEffect } from "react";

import useToggle from "../Hooks/useToggle";
import styled from "styled-components";

import { slideFromLeft, slideOutLeft } from "../helpers/anims";
import { getColor } from "../helpers/palette";

///TODO make 4 stage anim for drawer. Build fixed drawer open button
const SideMenu = styled.div`
  width: ${(props) => props.width};
  height: calc(100vh - 4rem);
  position: fixed;
  margin: 0;
  grid-column: 1;
  grid-row: 1;
  top: 4rem;
  left: 0%;
  animation: ${(props) => (props.anim ? slideFromLeft : slideOutLeft)} 0.3s
    ease-in-out both;
  box-shadow: 5px 5px 3px -3px rgba(89, 89, 89, 0.3);

  .interior {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: ${getColor("white")};
    height: 100%;
  }
  .close-button {
    height: 10%;
  }
`;

const Drawer = ({ width, children, toggleDrawer }) => {
  const [anim, toggleAnim] = useToggle(true);
  const handleToggle = (e) => {
    e.stopPropagation();
    toggleAnim();
    setTimeout(() => toggleDrawer(), 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      toggleAnim();
      setTimeout(() => toggleDrawer(), 200);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <>
      <SideMenu anim={anim} width={width}>
        {React.cloneElement(children, { handleToggle: handleToggle }, null)}
      </SideMenu>
    </>
  );
};

export default Drawer;
