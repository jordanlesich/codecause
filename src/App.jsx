import React, { useState, useEffect } from "react";

import LoggedIn from "./routes/LoggedIn";
import LoggingIn from "./pages/loggingIn";
import NotLoggedIn from "./routes/NotLoggedIn";
import { ViewportProvider } from "./Hooks/useViewport";
import { OverlayProvider } from "./contexts/overlayContext";

import { useAuth } from "./Hooks/useAuth";

const App = (props) => {
  const { user } = useAuth();

  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    if (!user && localStorage.getItem("coLabLocal")) {
      setLoginState("loading");
    } else if (!user) {
      setLoginState("notAuthed");
    } else {
      setLoginState("authed");
    }
  }, [user]);
  return (
    <ViewportProvider>
      <OverlayProvider>
        {loginState === "loading" && <LoggingIn />}
        {loginState === "notAuthed" && <NotLoggedIn />}
        {loginState === "authed" && <LoggedIn />}
      </OverlayProvider>
    </ViewportProvider>
  );
};

export default App;
