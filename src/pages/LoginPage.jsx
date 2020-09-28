import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Modal from "../components/modal";
import Login from "../components/login";
import SignUp from "../components/signUp";
import Spinner from "../components/spinner";
import Input from "../components/input";
import TextBox from "../components/textBox";
import Button from "../components/button";
import { BodyXs } from "../styles/typography";
const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const LoginPage = () => {
  const [mode, setMode] = useState(null);
  const [hasLoggedIn, setLoggedIn] = useState(false);
  const [hasTimedOut, sethasTimedOut] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("coLabLocal") && !hasLoggedIn) {
      setMode("loading");
      setLoggedIn(true);
    } else {
      setMode("signup");
    }
  }, [hasLoggedIn]);

  const timeOutSpinner = () => {
    if (mode === "loading") {
      setMode("login");
      localStorage.removeItem("coLabLocal");
      setLoggedIn(false);
      sethasTimedOut(true);
    }
  };
  const loginTimedOut = () => {};
  const toggleMode = () => {
    if (mode === "signup") {
      setMode("login");
    } else if (mode === "login") {
      setMode("signup");
    } else {
      console.error(
        "Toggle Sign in Mode should not be firing. Check out the LoginPage Component"
      );
    }
  };
  const setLoading = () => {
    setMode("loading");
    setTimeout(() => {
      timeOutSpinner();
    }, 3000);
  };

  return (
    <StyledLoginPage>
      {mode === "loading" && <Spinner timedOut={loginTimedOut} />}
      {/* {mode === "confirm" && <ConfirmEmail />} */}
      {mode === "login" && (
        <>
          {hasTimedOut && <p>Something timed out. Try signing in manually</p>}
          <Login setLoading={setLoading} />
          <p>Don't have a CoLab Account? </p>
          <Button fn={toggleMode} content="Sign Up" />
        </>
      )}
      {/* {mode === "recovery" && <Recovery />} */}
      {mode === "signup" && (
        <>
          <SignUp setLoading={setLoading} />
          <BodyXs>Already have an account? </BodyXs>
          <Button fn={toggleMode} content="Login" className="text-button" />
        </>
      )}
    </StyledLoginPage>
  );
};

export default LoginPage;
