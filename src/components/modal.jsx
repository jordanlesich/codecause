import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "react-feather";

import { fadeIn, fadeOut, slideUp, slideDown } from "../helpers/anims";
import Backdrop from "../components/backdrop";

const ModalBox = styled.div`
  position: fixed;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-radius: 4px;
  background-color: #ffffff;
  width: 40vw;
  padding: 3.2rem;
  z-index: 20;
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)} 0.2s ease-in-out
      both,
    ${(props) => (props.fadeIn ? slideUp : slideDown)} 0.2s ease-in-out both;
  .x-icon {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }
  .title {
    margin-bottom: 1.6rem;
  }
  .section {
    margin-bottom: 2.4rem;
  }
  .section-list {
    list-style: none;
    width: 30vw;
  }
  .section-heading {
    margin-bottom: 0.8rem;
  }
`;

const Modal = ({ children, toggleModal }) => {
  const [isFading, setIsOpening] = useState(true);

  const handleClick = (e) => {
    setIsOpening(false);
    setTimeout(() => toggleModal(), 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsOpening(false);
      setTimeout(() => toggleModal(), 200);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Backdrop fadeIn={isFading} handleClick={handleClick}>
      <ModalBox fadeIn={isFading}>
        <X className="x-icon" onClick={handleClick} type="button" />
        {children}
      </ModalBox>
    </Backdrop>
  );
};
export default Modal;
