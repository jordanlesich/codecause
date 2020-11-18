import React, { useState, createContext } from "react";

export const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModalWithContent = (content) => {
    setModalContent(content);
    setModal(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setModal(false);
  };

  return (
    <OverlayContext.Provider
      value={{ modal, modalContent, openModalWithContent, closeModal }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
