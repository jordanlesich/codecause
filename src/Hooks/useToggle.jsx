import { useState } from "react";

function UseToggle(initialState) {
  const [state, setState] = useState(initialState);
  const toggle = () => {
    setState(!state);
  };
  return [state, toggle];
}

export default UseToggle;
