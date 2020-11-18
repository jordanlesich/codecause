import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import styled from "styled-components";

import { OverlayContext } from "../contexts/overlayContext";
import { fadeIn, fadeOut, slideUp, slideDown } from "../helpers/anims";
import Backdrop from "../components/backdrop";
import { useContext } from "react";

const ModalBox = styled.div`
  position: fixed;
  border-radius: 4px;
  background-color: #ffffff;
  width: 100%;
  max-width: 72rem;

  /* padding: 3.2rem; */
  z-index: 20;
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)} 0.2s ease-in-out
      both,
    ${(props) => (props.fadeIn ? slideUp : slideDown)} 0.2s ease-in-out both;
  .x-icon {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }

  .section-heading {
    margin-bottom: 0.8rem;
  }
`;

const Modal = () => {
  const { modal, modalContent, closeModal } = useContext(OverlayContext);
  const [isFading, setIsOpening] = useState(true);

  const handleClick = (e) => {
    setIsOpening(false);
    setTimeout(() => {
      closeModal();
      setIsOpening(true);
    }, 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsOpening(false);
      setTimeout(() => {
        closeModal();
        setIsOpening(true);
      }, 200);
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
      {modal && (
        <Backdrop fadeIn={isFading} handleClick={handleClick}>
          <ModalBox fadeIn={isFading}>
            <X className="x-icon" onClick={handleClick} type="button" />
            {modalContent}
          </ModalBox>
        </Backdrop>
      )}
    </>
  );
};
export default Modal;
