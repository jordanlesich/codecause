import React from "react";
import styled from "styled-components";
import { Users, Edit, Home } from "react-feather";

import Break from "../components/break";
import ActiveUserList from "../components/activeUserList";
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

const ProjectBuildPanel = ({ project, switchMode }) => {
  return (
    <MainMenuPanel>
      <div className="top-list-section">
        <HeaderMd>{project && project.name}</HeaderMd>
      </div>
      <Break type="hard" />
      <div className="btn-list-section">
        <Button
          className="text-button list-button"
          fn={switchMode}
          value="dashboard"
          withIcon={<Home size="2.4rem" />}
          content="Dashboard"
        />

        <Button
          className="text-button list-button"
          fn={switchMode}
          value="whitepaper"
          withIcon={<Edit size="2.4rem" />}
          content="Edit Whitepaper"
        />
        <Button
          className="text-button list-button"
          fn={switchMode}
          value="users"
          withIcon={<Users size="2.4rem" />}
          content="Manage Team"
        />
      </div>

      <Break type="hard" />
      <div className="people-list-section">
        {project && (
          <ActiveUserList
            contributors={project.contributors}
            creator={project.creator}
            awards={project.awards}
          />
        )}
      </div>
      <FeedbackAbout />
    </MainMenuPanel>
  );
};

export default ProjectBuildPanel;
