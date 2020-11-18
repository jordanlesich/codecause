import React from "react";

const ModeManager = ({ modes, mode }) => {
  return <>{modes[mode]}</>;
};

export default ModeManager;
