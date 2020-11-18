import React, { useContext } from "react";
import styled from "styled-components";
import { Edit, Move, Trash } from "react-feather";

import { OverlayContext } from "../contexts/overlayContext";

import Button from "./button";
import { getColor } from "../helpers/palette";
import { HeaderMd, BodyMd } from "../styles/typography";
import { DashBox } from "./staticElements";
import EditSection from "../modals/editSection";
import MoveSection from "../modals/moveSection";
import DeleteSection from "../modals/deleteSection";

const StyledDynamicSection = styled(DashBox)`
  position: relative;
  .section {
    margin-bottom: 2.4rem;
  }
  /* margin-bottom: 2.4rem; */
  .icon-box {
    position: absolute;
    display: flex;
    bottom: 0.8rem;
    right: 1.6rem;
  }
  .modal-container {
    width: 40rem;
  }
  .edit-section-btn {
    padding: 1.6rem;
    margin-left: 0.8rem;
    border-radius: 4px;
    background-color: ${getColor("white")};
    border: 1px solid ${getColor("lightBorder")};
    color: ${getColor("grey400")};
    :hover,
    :focus {
      color: ${getColor("grey600")};
    }
  }
`;

const DynamicSection = ({
  handleEditProject,
  numSections,
  text,
  id,
  label,
}) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);

  const handleOpenEdit = () => {
    openModalWithContent(
      <EditSection
        label={label}
        text={text}
        id={id}
        onSubmit={handleEditProject}
        onCancel={closeModal}
      />
    );
  };
  const handleOpenDelete = () => {
    openModalWithContent(
      <DeleteSection
        label={label}
        text={text}
        id={id}
        onSubmit={handleEditProject}
        onCancel={closeModal}
      />
    );
  };
  const handleOpenMove = () => {
    openModalWithContent(
      <MoveSection
        onSubmit={handleEditProject}
        onCancel={closeModal}
        min={1}
        section={{ id, label, text }}
        max={numSections + 1}
      />
    );
  };

  return (
    <StyledDynamicSection>
      <div className="section" key={id || label}>
        <HeaderMd className="section-heading">{label}:</HeaderMd>
        <BodyMd className="section-body">{text}</BodyMd>
      </div>
      <div className="icon-box">
        <Button
          className="icon-button edit-section-btn"
          iconButton={<Edit />}
          fn={handleOpenEdit}
        />
        <Button
          className="icon-button edit-section-btn"
          iconButton={<Trash />}
          fn={handleOpenDelete}
        />
        <Button
          className="icon-button edit-section-btn"
          iconButton={<Move />}
          fn={handleOpenMove}
        />
      </div>
    </StyledDynamicSection>
  );
};

export default DynamicSection;
