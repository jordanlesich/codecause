import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Users,
  ArrowLeft,
  HelpCircle,
  List,
  MessageSquare,
} from "react-feather";

import Break from "../components/break";
import ActiveUserList from "../components/activeUserList";
import Button from "../components/button";
import { getColor } from "../helpers/palette";

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

const ProjectVisitorPanel = ({
  projectDisplay,
  setProjectDisplay,
  creator,
  contributors,
  awards,
}) => {
  const history = useHistory();
  const ApplyToProject = () => {
    setProjectDisplay("applying");
  };
  const ReadWhitepaper = () => {
    setProjectDisplay("paper");
  };
  const goTo = (e) => {
    console.log(e.target.value);
    history.push(e.target.value);
  };

  return (
    <MainMenuPanel>
      <div className="top-list-section">
        {projectDisplay === "paper" ? (
          <Button
            className="text-button list-button"
            fn={ApplyToProject}
            withIcon={<Users size="2.4rem" />}
            content="Send Application"
          />
        ) : (
          <Button
            className="text-button list-button"
            fn={ReadWhitepaper}
            withIcon={<List size="2.4rem" />}
            content="Whitepaper"
            value="/projects"
          />
        )}
        <Button
          className="text-button list-button"
          fn={goTo}
          withIcon={<ArrowLeft size="2.4rem" />}
          content="Back to Listing"
        />
      </div>
      <Break type="hard" />
      <div className="people-list-section">
        <ActiveUserList
          contributors={contributors}
          creator={creator}
          awards={awards}
        />
      </div>
      <Break type="hard" />

      <div className="feedback-about-section">
        <Button
          className="text-button list-button"
          withIcon={<HelpCircle size="2.4rem" />}
          content="About Us"
          fn={goTo}
          value="/about"
        />
        <Button
          className="text-button list-button"
          withIcon={<MessageSquare size="2.4rem" />}
          content="Feedback"
          fn={goTo}
          value="/feedback"
        />
      </div>
    </MainMenuPanel>
  );
};

export default ProjectVisitorPanel;
