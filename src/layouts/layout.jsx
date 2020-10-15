import React from "react";
import styled from "styled-components";

import Stepper from "../stepper/stepper";
import { StepperProvider } from "../contexts/stepperContext";
import Header from "../layouts/header";
import Login from "../components/login";
import SignUp from "../components/signUp";
import useToggle from "../Hooks/useToggle";
import { getColor } from "../helpers/palette";

const StyleTemplate = styled.main`
  display: grid;
  height: calc(100% - 5.6rem);
  grid-template-columns: 28rem 1fr minmax(60rem, 72rem) 4fr;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  transition: 0.2s all;
`;
const MainSpace = styled.main`
  width: 100%;
  padding-top: 4rem;
  grid-column: 3/4;
  grid-row: 1;
`;

const SideSpace = styled.aside`
  width: 100%;
  grid-column: 1;
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
        <SideSpace>{sideMenu}</SideSpace>
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
