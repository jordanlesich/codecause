import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Modal from "../components/modal";
import Input from "../components/input";
import TextBox from "../components/textBox";
import Button from "../components/button";

const EditModal = ({ toggleModal, saveAdd }) => {
  const [sectionText, setSectionText] = useState({
    label: "",
    text: "",
    id: uuidv4(),
  });

  const handleTyping = (e) => {
    if (e.target.name === "label" || e.target.name === "text") {
      setSectionText({ ...sectionText, [e.target.name]: e.target.value });
    } else {
      console.warn("input name value doesn't exist");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveAdd(sectionText);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        <h2>Create New Section</h2>
        <Input
          name="label"
          id="add-section-input"
          value={sectionText.label}
          label="Write Section Label"
          fn={handleTyping}
          autoFocus
        />
        <label htmlFor="edit-section-box">Write Section Text</label>
        <TextBox
          name="text"
          value={sectionText.text}
          id="add-section-box"
          fn={handleTyping}
        />
        <Button
          fn={toggleModal}
          content="Cancel"
          className="secondary"
          type="button"
        />
        <Button
          fn={handleSubmit}
          content="Save Section"
          className="success"
          type="submit"
        />
      </form>
    </Modal>
  );
};

export default EditModal;
