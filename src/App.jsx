import React from "react";
import Routes from "./routes/Routes";
import { AuthProvider } from "./contexts/authContext";
const App = (props) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
