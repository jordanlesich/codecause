import React from "react";
import Routes from "./routes/Routes";
import { AuthProvider } from "./contexts/authContext";
import { StepperProvider } from "./contexts/stepperContext";

const App = (props) => {
  return (
    <AuthProvider>
      <StepperProvider>
        <Routes />
      </StepperProvider>
    </AuthProvider>
  );
};

export default App;
