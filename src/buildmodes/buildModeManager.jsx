import React from "react";

const BuildModeManager = ({ modes, mode }) => {
  return <>{modes[mode]}</>;
};

export default BuildModeManager;
