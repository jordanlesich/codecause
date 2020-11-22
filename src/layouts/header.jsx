import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  Home,
  User,
  Menu,
} from "react-feather";

import { useAuth } from "../Hooks/useAuth";
import Button from "../components/button";
import {
  BodyXs,
  BoldText,
  DisplaySm,
  HeaderMd,
  HeaderSm,
} from "../styles/typography";
import { getColor } from "../helpers/palette";
import { useHistory } from "react-router";
import Break from "../components/break";
import { widthQuery } from "../styles/responsive";

const NavContainer = styled.nav`
  height: 5.6rem;
  width: 100%;
  padding: 0 2.4rem;
  grid-row: 1;
  grid-column: 1/6;
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
  background-color: ${(props) =>
    props.user ? getColor("dark") : getColor("white")};
  z-index: 10;
  @media ${widthQuery.tablet} {
    padding: 0 4rem;
  }
  @media ${widthQuery.mobileL} {
    padding: 0 2.4rem;
  }
  @media ${widthQuery.mobileS} {
    padding: 0 1.6rem;
  }
  .co-lab {
    letter-spacing: -1px;
    display: flex;
    align-items: center;

    .icon-button {
      margin-right: 1.6rem;
      transform: translateY(0.2rem);
      display: none;
      @media ${widthQuery.tablet} {
        display: block;
      }
    }
  }
  .nav-button {
    color: ${(props) => (props.user ? getColor("white") : getColor("dark"))};
  }
  .user-menu-container {
    position: relative;
    margin-left: auto;
  }
  .user-menu-button {
    padding-right: 0;

    .icon-wrapper {
      margin-left: 0.4rem;
      transform: translateY(0.2rem);
    }
  }
  .signed-in-as {
    margin: 0.8rem 2.4rem;
  }
  .user-name-text {
    margin-left: 2.4rem;
    margin-bottom: 0.8rem;
  }
  .user-menu-dropdown {
    position: absolute;
    background-color: ${getColor("white")};
    top: 4.8rem;
    right: 2.4rem;
    padding: 0.8rem;
    /* right: 2.4rem; */
    border: 1px solid ${getColor("lightBorder")};
    border-radius: 0 0 4px 4px;
    box-shadow: 3px 2px 2px 0px rgba(0, 0, 0, 0.37);
  }
  .dropdown-item {
    button.text-button {
      width: 100%;
      border-radius: 0;
      padding: 1.6rem 2.4rem;
      :hover {
        background-color: ${getColor("grey200")};
      }
      :active {
        background-color: ${getColor("grey300")};
      }
      svg {
      }
      .icon-wrapper {
        margin-right: 1.6rem;
      }
      svg {
        color: ${getColor("grey500")};
      }
      :hover {
        color: ${getColor("grey600")};
      }
    }
  }
`;

const Header = ({ openDrawer }) => {
  const { user, signout } = useAuth();
  const history = useHistory();
  const [userMenu, setUserMenu] = useState(false);
  const clickRef = useRef(null);

  const goHome = () => {
    history.push("/");
  };
  const toDash = () => {
    history.push(`/dash/${user.id}`);
  };
  const toggleUserMenu = () => {
    setUserMenu((prevState) => !prevState);
  };
  const handleClick = useCallback((e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setUserMenu(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <NavContainer user={user}>
      <div className="co-lab">
        <Button
          className="icon-button nav-button"
          iconButton={<Menu />}
          fn={openDrawer}
        />
        <Button
          content={
            <DisplaySm>
              co<BoldText>lab</BoldText>
            </DisplaySm>
          }
          className="text-button nav-button"
          fn={goHome}
        />
      </div>

      <div className="user-menu-container" ref={clickRef}>
        {userMenu ? (
          <>
            <Button
              appendIcon={<ChevronUp size="1.6rem" />}
              content={<User />}
              className="text-button nav-button user-menu-button "
              fn={toggleUserMenu}
            />
            <div className="user-menu-dropdown">
              <div className="dropdown-item">
                <BodyXs className="signed-in-as">Signed in as:</BodyXs>
                <HeaderMd className="user-name-text">
                  {user?.displayName || "Sign In"}
                </HeaderMd>
                <Break type="soft" />
              </div>
              <div className="dropdown-item">
                <Button
                  withIcon={<Home size="1.6rem" />}
                  content="Dashboard"
                  className="text-button"
                  fn={toDash}
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
            appendIcon={<ChevronDown size="1.6rem" />}
            content={<User />}
            className="text-button nav-button user-menu-button"
            fn={toggleUserMenu}
          />
        )}
      </div>
    </NavContainer>
  );
};

export default Header;
