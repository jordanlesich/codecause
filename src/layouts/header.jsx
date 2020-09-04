import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../contexts/authContext";
import Button from "../components/button";
import { getColor } from "../helpers/palette";

const NavContainer = styled.nav`
  height: 4rem;
  max-width: 100vw;
  position: sticky;
  top: 0;
  background-color: ${getColor("dark")};
  z-index: 10;
`;

const Header = ({ toggleLogin, toggleSignUp, toggleDrawer, toggleStepper }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavContainer>
      <Button fn={toggleDrawer} content="Menu" />
      <Button fn={toggleStepper} content="Stepper" />
      {user ? (
        <>
          <Button content="Logout" fn={logout} />
          <h1 style={{ color: "white" }}>Welcome {user.displayName}</h1>
        </>
      ) : (
        <>
          <Button fn={toggleLogin} content="Login" />
          <Button fn={toggleSignUp} content="Sign Up" />
        </>
      )}
    </NavContainer>
  );
};

export default Header;
