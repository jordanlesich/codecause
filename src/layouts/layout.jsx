import React from "react";
import styled from "styled-components";

import Stepper from "../stepper/stepper";
import { StepperProvider } from "../contexts/stepperContext";
import Header from "../layouts/header";
import Login from "../components/login";
import SignUp from "../components/signUp";
import useToggle from "../Hooks/useToggle";

const StyleTemplate = styled.main`
  display: grid;
  grid-template-columns: 400px minmax(0, 50px) minmax(800px, 1000px) auto;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  transition: 0.2s all;

  &.drawer-closed {
    grid-template-columns: auto 0 minmax(800px, 1000px) auto;
  }
`;
const MainSpace = styled.main`
  width: 100%;
  padding-top: 4rem;
  grid-column: 3/4;
  grid-row: 1;
`;

const Layout = ({ children, sideMenu }) => {
  const [drawer, toggleDrawer] = useToggle(true);
  const [stepper, toggleStepper] = useToggle(false);
  const [login, toggleLogin] = useToggle(false);
  const [signUp, toggleSignUp] = useToggle(false);

  return (
    <>
      <Header
        toggleLogin={toggleLogin}
        toggleSignUp={toggleSignUp}
        toggleDrawer={toggleDrawer}
        toggleStepper={toggleStepper}
      />
      <StyleTemplate className={!drawer && "drawer-closed"}>
        <MainSpace>{children}</MainSpace>
      </StyleTemplate>
      {login && <Login toggleModal={toggleLogin} />}
      {signUp && <SignUp toggleModal={toggleSignUp} />}
      {stepper && (
        <StepperProvider test={"test"}>
          <Stepper toggleStepper={toggleStepper} />
        </StepperProvider>
      )}
    </>
  );
};

export default Layout;
