import React, { useContext } from "react";
import styled from "styled-components";
import { User, Mail } from "react-feather";

import { OverlayContext } from "../contexts/overlayContext";
import DMmodal from "../modals/DMmodal";
import Break from "../components/break";
import Button from "../components/button";
import { getColor } from "../helpers/palette";
import { HeaderMd } from "../styles/typography";
import FeedbackAbout from "../components/feedbackAbout";

const MainMenuPanel = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .top-list-section,
  .btn-list-section,
  .people-list-section,
  .feedback-about-section {
    padding: 1.6rem 2.4rem;
  }

  .btn-list-section,
  .feedback-about-section {
    button {
      margin-bottom: 0.8rem;
    }
    button:last-child {
      margin-bottom: 0;
    }
  }
  .people-list-section {
    margin-bottom: auto;
  }

  .list-button {
    padding: 0;
    font-weight: 400;
    span.icon-wrapper {
      margin-right: 1.2rem;
    }
    svg {
      color: ${getColor("grey500")};
      transition: 0.2s color;
    }
    :hover {
      svg {
        color: ${getColor("grey600")};
      }
    }
  }
  .nav-btns {
    margin-top: 4rem;
    margin-bottom: 1.6rem;
  }
  .user-project-list {
    list-style: none;
    margin-top: 1.6rem;
    margin-bottom: 3.2rem;
    max-height: 50%;
    overflow-y: auto;
  }
  .end-btns {
    display: flex;
  }
`;

const UserViewPanel = ({ user, switchMode }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);

  const openDMmodal = () => {
    openModalWithContent(<DMmodal recipient={user} closeModal={closeModal} />);
  };

  return (
    <MainMenuPanel>
      <div className="top-list-section">
        <HeaderMd>{user && user.displayName}</HeaderMd>
      </div>
      <Break type="hard" />
      <div className="btn-list-section">
        <Button
          className="text-button list-button"
          fn={switchMode}
          value="aboutUser"
          withIcon={<User size="2.4rem" />}
          content={user ? `About ${user.displayName}` : "About User"}
        />
        <Button
          className="text-button list-button"
          fn={openDMmodal}
          value="contactUser"
          withIcon={<Mail size="2.4rem" />}
          content={user ? `Contact ${user.displayName}` : "Contact User"}
        />
      </div>
      <Break type="hard" />
      <FeedbackAbout />
    </MainMenuPanel>
  );
};

export default UserViewPanel;
