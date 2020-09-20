import React from "react";
import Modal from "../components/modal";
import Section from "../components/section";
import Button from "../components/button";

const DeleteModal = ({ selectedSection, saveDelete, toggleModal }) => {
  return (
    <Modal>
      <form onSubmit={saveDelete}>
        <h2>Delete This Section?</h2>
        <Section label={selectedSection.label}>{text}</Section>
        <Button fn={toggleModal} type="close" />
        <Button fn={deleteSection} type="submit" />
      </form>
    </Modal>
  );
};

export default DeleteModal;
