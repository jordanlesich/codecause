import React from "react";
import styled from "styled-components";
import { Edit, Home } from "react-feather";

import Break from "../components/break";
import Button from "../components/button";
import { getColor } from "../helpers/palette";
import { HeaderMd } from "../styles/typography";
import FeedbackAbout from "../components/feedbackAbout";
import UserProjectList from "../components/userProjectList";
import { useContext } from "react";
import { OverlayContext } from "../contexts/overlayContext";
import ComingSoon from "../modals/comingSoon";

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

  .end-btns {
    display: flex;
  }
`;

const UserDashPanel = ({ user }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);

  const comingSoonEdit = () => {
    openModalWithContent(
      <ComingSoon
        body="With the next edit, the user will be able to edit their interests, contact info, and bio."
        primaryFn={closeModal}
      />
    );
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
          withIcon={<Home size="2.4rem" />}
          content="Dashboard"
        />
        <Button
          className="text-button list-button"
          withIcon={<Edit size="2.4rem" />}
          content="Edit Profile"
          fn={comingSoonEdit}
        />
      </div>
      <Break type="hard" />
      <div className="people-list-section">
        {user && (
          <UserProjectList
            contributing={user.projectsContributing || []}
            created={user.projectsCreated || []}
          />
        )}
      </div>
      <FeedbackAbout />
    </MainMenuPanel>
  );
};

export default UserDashPanel;
