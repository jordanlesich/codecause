import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Users, ArrowLeft } from "react-feather";

import Break from "../components/break";
import ActiveUserList from "../components/activeUserList";
import Button from "../components/button";
import { getColor } from "../helpers/palette";
import FeedbackAbout from "../components/feedbackAbout";

const MainMenuPanel = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .top-list-section,
  .search-section,
  .people-list-section,
  .feedback-about-section {
    padding: 1.6rem 2.4rem;
  }

  .top-list-section,
  .feedback-about-section {
    button:first-child {
      margin-bottom: 0.8rem;
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

const ProjectVisitorPanel = ({ id, project, isInvolved }) => {
  const history = useHistory();
  const applyToProject = () => {
    history.push(`/project/${id}/apply/0/0`);
  };

  const goTo = (e) => {
    history.push(e.target.value);
  };
  const toProjectDashboard = () => {
    //TODO authenticate
    history.push(`/build/${project.id}`);
  };

  return (
    <>
      <MainMenuPanel>
        <div className="top-list-section">
          {isInvolved ? (
            <Button
              className="text-button list-button"
              fn={toProjectDashboard}
              withIcon={<Users size="2.4rem" />}
              content="Go To Members Only"
            />
          ) : (
            <Button
              className="text-button list-button"
              fn={applyToProject}
              withIcon={<Users size="2.4rem" />}
              content="Send Application"
            />
          )}
          <Button
            className="text-button list-button"
            fn={goTo}
            value="/projects"
            withIcon={<ArrowLeft size="2.4rem" />}
            content="Back to Listing"
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
    </>
  );
};

export default ProjectVisitorPanel;
