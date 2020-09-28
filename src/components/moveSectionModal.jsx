import React from "react";
import Modal from "../components/modal";

const MoveSectionModal = ({
  sections,
  saveMove,
  toggleModal,
  currentIndex,
}) => {
  if (!sections) return null;
  return (
    <Modal toggleModal={toggleModal}>
      <form>
        <label htmlFor="">Move to Position:</label>
        <select
          onChange={saveMove}
          onBlur={saveMove}
          defaultValue={currentIndex}
        >
          {sections.map((section, index) => (
            <option value={index} key={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </form>
    </Modal>
  );
};

export default MoveSectionModal;
