import React from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp, LogOut, Settings, Home } from "react-feather";

import { useAuth } from "../Hooks/useAuth";
import useToggle from "../Hooks/useToggle";
import Button from "../components/button";
import { DisplaySm, HeaderMd } from "../styles/typography";
import { getColor } from "../helpers/palette";
import { useHistory } from "react-router";

const NavContainer = styled.nav`
  height: 5.6rem;
  width: 100%;
  grid-row: 1;
  grid-column: 1/6;
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
  background-color: ${getColor("dark")};
  z-index: 10;
  .co-lab {
    letter-spacing: -1px;
    margin-left: 2.4rem;
  }
  .nav-button {
    color: ${getColor("white")};
  }
  .user-menu-container {
    position: relative;
    margin-left: auto;
    min-width: 16rem;
    padding-right: 2.4rem;
  }
  .user-menu-button {
    padding: 0;
  }
  .user-menu-dropdown {
    position: absolute;
    width: 16rem;
    top: 4.8rem;
    border: 1px solid ${getColor("lightBorder")};
    border-radius: 0 0 4px 4px;
  }
  .dropdown-item {
    padding: 0.2rem;
    svg {
      margin-right: 0.8rem;
      color: ${getColor("grey500")};
    }
    :hover {
      svg {
        color: ${getColor("grey600")};
      }
    }
  }
`;

const Header = () => {
  const { user, signout } = useAuth();
  const history = useHistory();
  const [userMenu, toggleUserMenu] = useToggle(false);

  const goHome = () => {
    history.push("/");
  };
  return (
    <NavContainer>
      <Button
        content={<DisplaySm>colab</DisplaySm>}
        className="text-button co-lab nav-button"
        fn={goHome}
      />

      <div className="user-menu-container">
        {userMenu ? (
          <>
            <Button
              withIcon={<ChevronUp />}
              content={<HeaderMd>{user.displayName}</HeaderMd>}
              className="text-button nav-button user-menu-button"
              fn={toggleUserMenu}
            />
            <div className="user-menu-dropdown">
              <div className="dropdown-item">
                <Button
                  content="Dashboard"
                  withIcon={<Home size="1.6rem" />}
                  className="text-button"
                />
              </div>
              {/* <Break type="hard" /> */}
              <div className="dropdown-item">
                <Button
                  content="Sign Out"
                  withIcon={<LogOut size="1.6rem" />}
                  className="text-button"
                  fn={signout}
                />
              </div>
              {/* <Break type="soft" /> */}
              <div className="dropdown-item">
                <Button
                  content="Settings"
                  withIcon={<Settings size="1.6rem" />}
                  className="text-button"
                />
              </div>
            </div>
          </>
        ) : (
          <Button
            withIcon={<ChevronDown />}
            content={<HeaderMd>{user.displayName}</HeaderMd>}
            className="text-button nav-button user-menu-button"
            fn={toggleUserMenu}
          />
        )}
      </div>
    </NavContainer>
  );
};

export default Header;
