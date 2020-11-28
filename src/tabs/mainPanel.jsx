import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PlusCircle, Home } from "react-feather";

import { useAuth } from "../Hooks/useAuth";
import Break from "../components/break";
import Search from "../components/search";
import UserProjectList from "../components/userProjectList";
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
  .project-list-section,
  .feedback-about-section {
    padding: 1.6rem 2.4rem;
  }

  .top-list-section,
  .feedback-about-section {
    button:first-child {
      margin-bottom: 0.8rem;
    }
  }
  .project-list-section {
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

const MainPanel = ({ queryByName }) => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleType = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    queryByName(searchText);
  };

  const goTo = (e) => {
    history.push(e.target.value);
  };

  return (
    <MainMenuPanel>
      <form className="search-section" onSubmit={handleSubmit}>
        <Search
          placeholder="Search for projects"
          value={searchText}
          onType={handleType}
        />
      </form>
      <Break type="hard" />
      <div className="top-list-section">
        <Button
          className="text-button list-button"
          fn={goTo}
          value="/create/0/0"
          withIcon={<PlusCircle size="2.4rem" />}
          content="Create a Project"
        />
        <Button
          className="text-button list-button"
          fn={goTo}
          value={`/dash/${user.id}`}
          withIcon={<Home size="2.4rem" />}
          content="Go To Dash"
        />
      </div>
      <Break type="hard" />
      <div className="project-list-section">
        <UserProjectList
          contributing={user.projectsContributing || []}
          created={user.projectsCreated || []}
        />
      </div>
      <FeedbackAbout />
    </MainMenuPanel>
  );
};

export default MainPanel;
