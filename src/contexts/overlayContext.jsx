import React, { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router";
import { useViewport } from "../Hooks/useViewport";
import { widthBreakpoint } from "../styles/responsive";

export const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { width } = useViewport();
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();

  //This makes sure the drawer
  //closes whenever we change routes
  //or when a modal opens
  useEffect(() => {
    if (width < widthBreakpoint.tablet) {
      setDrawer(false);
    }
    if (modal) {
      setDrawer(false);
    }
  }, [location.pathname, width, modal]);

  const openModalWithContent = (content) => {
    setModalContent(content);
    setModal(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setModal(false);
  };
  const openDrawer = () => {
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  const toggleDrawer = () => {
    setDrawer((prevState) => !prevState);
  };
  return (
    <OverlayContext.Provider
      value={{
        modal,
        modalContent,
        openModalWithContent,
        closeModal,
        openDrawer,
        toggleDrawer,
        drawer,
        closeDrawer,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
