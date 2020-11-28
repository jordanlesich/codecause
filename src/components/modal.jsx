import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import styled from "styled-components";

import { OverlayContext } from "../contexts/overlayContext";
import { fadeIn, fadeOut, slideUp, slideDown } from "../helpers/anims";
import Backdrop from "../components/backdrop";
import { useContext } from "react";
import { widthQuery } from "../styles/responsive";

const ModalBox = styled.div`
  position: fixed;
  border-radius: 4px;
  background-color: #ffffff;
  width: 100%;
  max-width: 72rem;
  z-index: 20;
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)} 0.2s ease-in-out
      both,
    ${(props) => (props.fadeIn ? slideUp : slideDown)} 0.2s ease-in-out both;
  @media ${widthQuery.mobileL} {
    top: 5.6rem;
    height: 100%;
  }
  .x-icon {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    z-index: 21;
  }
  .section-heading {
    margin-bottom: 0.8rem;
  }
  .content-box {
    overflow-y: auto;
    @media ${widthQuery.mobileL} {
      position: relative;
      z-index: 20;
      height: 100%;
      padding-bottom: 5.6rem;
    }
  }
`;

const Modal = () => {
  const { modal, modalContent, closeModal } = useContext(OverlayContext);
  const [isOpening, setIsOpening] = useState(true);
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
        <>
          <Backdrop fadeIn={isOpening} handleClick={handleClick}>
            <ModalBox fadeIn={isOpening}>
              <X className="x-icon" onClick={handleClick} type="button" />
              <div className="content-box">{modalContent}</div>
            </ModalBox>
          </Backdrop>
        </>
      )}
    </>
  );
};
export default Modal;
