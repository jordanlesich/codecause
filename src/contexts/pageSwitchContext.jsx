import React, { useState, createContext } from "react";

const PageSwitchContext = createContext();

const PageSwitchProvider = () => {
  const [pageState, setPageState] = useState({});

  return (
    <PageSwitchContext.Provider
      value={(pageState, setPageState)}
    ></PageSwitchContext.Provider>
  );
};
