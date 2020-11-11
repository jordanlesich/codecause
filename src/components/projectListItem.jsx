import React from "react";
import { MessageSquare, Users } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Tag from "./tag";
import Votes from "./votes";
import Button from "./button";
import Break from "./break";
import { getColor } from "../helpers/palette";
import { BodyMd, DisplayMd } from "../styles/typography";

const ListItem = styled.li`
  width: 100%;
  /* width: 72rem; */
  position: relative;
  list-style: none;
  padding: 2.4rem 3.2rem;
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  margin-bottom: 1.6rem;
  .block-link {
    position: absolute;
    /* z-index: -10000; */
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .item-title-section {
    display: flex;
    align-items: flex-start;
    button {
      transform: translateY(0.35rem);
    }
  }
  .project-title {
    margin-bottom: 0.8rem;
    margin-right: auto;
    max-width: 58rem;
  }
  .project-description {
    margin-bottom: 1.6rem;
    max-width: 58rem;
  }
  .divider {
    margin: 1.6rem 0;
  }
  .bottom-buttons-section {
    display: flex;
    width: 100%;
    button {
      padding: 0;
      margin-right: 1.6rem;
    }
  }
  .vote-button {
    margin-right: auto;
  }
  .skill-tags {
    display: flex;
    button {
      margin-right: 0.8rem;
    }
  }
`;

const ProjectListItem = ({ project }) => {
  return (
    <ListItem>
      <Link to={`project/${project.slug}`} className="block-link" />
      <div className="item-title-section">
        <DisplayMd className="project-title">{project.name}</DisplayMd>
        <Tag tag={project.solutionTags[0].name} type="solution" />
        <Tag
          tag={project.causeTags[0].name}
          type="cause"
          className="cause-tag"
        />
      </div>
      <div className="info-wrapper">
        <BodyMd className="project-description">{project.description}</BodyMd>
        <div className="skill-tags">
          {project.skillTags.map((tag) => (
            <Tag
              tag={tag.name}
              type="skill"
              key={`${project.name}-${tag.name}`}
            />
          ))}
        </div>
        <div className="divider">
          <Break type="soft" />
        </div>
        <div className="bottom-buttons-section">
          <Votes project={project} variant="listing" />
          <Button
            content={project.commentCount}
            className="text-button"
            withIcon={
              <MessageSquare size="2.4rem" color={getColor("grey500")} />
            }
          />
          <Button
            content={project.contributors.length}
            className="text-button"
            withIcon={<Users size="2.4rem" color={getColor("grey500")} />}
          />
        </div>
      </div>
    </ListItem>
  );
};

export default ProjectListItem;
