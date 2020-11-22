import React from "react";
import { Info } from "react-feather";

import Button from "./button";
import { getColor } from "../helpers/palette";
import { useContext } from "react";
import { OverlayContext } from "../contexts/overlayContext";
import InfoModal from "../modals/infoModal";

const InfoButton = ({ content }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);
  const handleModal = () => {
    openModalWithContent(
      <InfoModal
        title={content.title}
        sections={content.sections}
        closeModal={closeModal}
      />
    );
  };

  return (
    <span>
      <Button
        iconButton={<Info size="2rem" color={`${getColor("blue400")}`} />}
        fn={handleModal}
        className="icon-button"
      />
    </span>
  );
};

export default InfoButton;
