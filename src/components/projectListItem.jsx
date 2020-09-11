import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Votes from "../components/votes";
import { getColor } from "../helpers/palette";

const ListItem = styled.li`
  display: flex;
  position: relative;
  background-color: ${getColor("white")};
  width: 40rem;
  padding: 0.5rem 0;
  list-style: none;
  border-top: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  transition: 0.2s all;
  .posted-by-panel {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    align-items: center;
    padding: 0 2rem;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
  }
  .avatar-wrapper {
    margin-bottom: 0.25rem;
  }
  .posted-by-text {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .project-created-at {
    opacity: 0.8;
  }
  .info-wrapper {
    border-left: 1px solid ${getColor("lightBorder")};
    padding-left: 1.5rem;
  }
  .project-name {
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0.25rem;
    padding: 0.25rem;
    color: ${getColor("primary")};
  }
  .project-name:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .project-description {
    margin: 0 0.25rem;
    padding: 0.25rem;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    flex-basis: auto;
    margin-bottom: 1rem;
  }

  .bottom-section {
    display: flex;
    margin-bottom: 0.5rem;
  }
  .vote-wrapper {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }
`;

const ProjectListItem = ({ project }) => {
  return (
    <ListItem>
      <div className="info-wrapper">
        <span className="vote-wrapper">
          <Votes votes={project.votes} id={project.slug} />
        </span>
        <Link
          to={{
            pathname: `projects/${project.slug}`,
            state: project,
          }}
          className="project-name"
        >
          {project.name}
        </Link>
        <p className="project-description">{project.description}</p>
        <div className="bottom-section">
          {/* <div className="project-tag">
            {project.tags
              .filter((proj) => proj.category === "project")
              .map((proj) => {
                return (
                  <Tag
                    type={proj.category}
                    text={proj.name}
                    key={proj.id}
                    value={tag}
                  />
                );
              })}
          </div> */}
          {/* <div className="cause-tag">
            {getFakeTags(fakeCauseTags, 1, 1).map((tag, index) => {
              return <Tag type="project" text={tag} key={index} value={tag} />;
            })}
          </div> */}
        </div>
      </div>
    </ListItem>
  );
};

export default ProjectListItem;
