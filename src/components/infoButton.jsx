import React from "react";
import styled from "styled-components";
import { Info } from "react-feather";

import Modal from "./modal";
import useToggle from "../Hooks/useToggle";
import Button from "./button";
import { getColor } from "../helpers/palette";
const StyledInfoButton = styled.span`
  
`;

  
const InfoButton = ({ content }) => {
  const [infoModal, toggleModal] = useToggle(false);

  return (
    <>
      {infoModal && <Modal toggleModal={toggleModal}>{content}</Modal>}
      <StyledInfoButton>
        <Button
          iconButton={<Info size="2rem" color={`${getColor("blue400")}`} />}
          fn={toggleModal}
          className="icon-button"
        />
       
      </StyledInfoButton>
    </>
  );
};

export default InfoButton;
