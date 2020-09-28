import React from "react";
import Modal from "../components/modal";
import Section from "../components/section";
import Button from "../components/button";

const DeleteModal = ({ selectedSection, saveDelete, toggleModal }) => {
  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={saveDelete}>
        <h2>Delete This Section?</h2>
        <Section label={selectedSection.label}>{selectedSection.text}</Section>
        <Button
          fn={toggleModal}
          type="button"
          content="Close"
          className="secondary"
        />
        <Button
          fn={saveDelete}
          type="submit"
          content="Delete"
          className="danger"
        />
      </form>
    </Modal>
  );
};

export default DeleteModal;
