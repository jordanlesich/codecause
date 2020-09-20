import React from "react";
import Modal from "../components/modal";
import Input from "../components/input";
import TextBox from "../components/textBox";
import Section from "../components/section";
import Button from "../components/button";

const EditModal = ({
  toggleModal,
  selectedSection,
  handleEditTyping,
  saveEdit,
}) => {
  return (
    <Modal>
      <form onSubmit={saveEdit}>
        <h2>Edit Section</h2>
        <Input
          name="label"
          id="edit-section-input"
          value={selectedSection.label}
          label="Edit Section Heading"
          fn={handleEditTyping}
          autoFocus
        />
        <label htmlFor="edit-section-box">Edit Section Text</label>
        <TextBox
          name="text"
          value={selectedSection.text}
          id="edit-section-box"
          fn={handleEditTyping}
        />
        <Button
          fn={toggleModal}
          content="Cancel"
          className="secondary"
          type="button"
        />
        <Button
          fn={saveEdit}
          content="Save Edit"
          className="primary"
          type="submit"
        />
      </form>
    </Modal>
  );
};

export default EditModal;
