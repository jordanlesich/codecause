import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

import Tag from "../components/tag";
import { getColor } from "../helpers/palette";

const Paper = styled.div`
  grid-column: 3/4;
  background-color: ${getColor("white")};
  border: 1px solid ${getColor("lightBorder")};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: none;
  color: rgba(41, 41, 41, 1);
  padding-top: 3rem;

  .paper-title {
    line-height: 48px;
    font-size: 3.2rem;
    font-weight: 300;
    margin: 0rem 6rem 3rem 4rem;
  }

  .section,
  .sub-section {
    padding: 1rem;
    line-height: 32px;
    font-size: 1.2rem;
    letter-spacing: -0.003em;
    font-style: normal;
    font-weight: 400;
  }

  .section {
    margin: 1rem 1rem 0rem 3rem;
    line-height: 40px;
  }
  .sub-section {
    margin: 0 1rem 1rem 5rem;
  }
  .heading {
    font-size: 1.8rem;
    letter-spacing: -0.022em;
    font-weight: 600;
    margin-bottom: 0.5rem;
    word-break: break-word;
    padding-right: 6rem;
  }
  .sub-heading {
    font-weight: 500;
  }
  p {
    padding-top: 0.5rem;
    padding-right: 6rem;
  }
  .editable {
    border-top: 1px solid rgba(0, 0, 0, 0);
    transition: 0.2s all;
  }
  .editable:hover {
    border-top: 1px solid ${getColor("lightBorder")};
  }
`;

const handleDateFormat = (date) => format(date, "MM/dd/yyyy");
const getDate = (project) => {
  if (project.lastUpdated) return handleDateFormat(project.lastUpdated);
  if (project.timeCreated) return handleDateFormat(project.timeCreated);
  else return "Error: No date found";
};

const WhitePaper = ({ project }) => {
  const history = useHistory();

  const searchByTag = ({ field, value }) => {
    history.push({
      pathname: "/projects",
      state: { field, value },
    });
  };
  return (
    <>
      <Paper>
        <h2 className="paper-title">{project.name || "Error: No Title"}</h2>
        <div className="section">
          <div>
            {project.creator} is building a{" "}
            <Tag
              type="solution"
              text={project.solutionTag}
              fn={searchByTag}
              value={project.solutionTag}
            />{" "}
            for
            <Tag
              type="cause"
              text={project.causeTag}
              fn={searchByTag}
              value={project.causeTag}
            />
            <p>
              They are looking for:{" "}
              {project.skillTags.map((tag) => (
                <Tag
                  type="skill"
                  text={tag}
                  key={tag}
                  fn={searchByTag}
                  value={tag}
                />
              ))}
            </p>
          </div>
          <p>Last updated: {getDate(project)}</p>
        </div>
        <div className="section">
          <h3 className="heading">Brief:</h3>
          <p className="response editable">
            {project.description || "Error: No description found"}
          </p>
        </div>
        <div className="section">
          <h3 className="heading">Problem:</h3>
          <p className="response editable">
            {project.problem || "Error: No problem found"}
          </p>
        </div>
        <div className="section">
          <h3 className="heading">Solution:</h3>
          <p className="response editable">
            {project.solution || "Error: No solution found"}
          </p>
        </div>
        <div className="section">
          <h3 className="heading">The Minimum Viable Product:</h3>
          <p className="response editable">
            {project.mvp || "Error: No MVP found"}
          </p>
        </div>
        <div className="section">
          <h3 className="heading">Creator's Experience:</h3>
          <p className="response editable">
            {project.experience || "Error: No XP found"}
          </p>
        </div>
        <div className="section">
          <h3 className="heading">Extra details:</h3>
          <p className="response editable">
            {project.details || "Error: No details found"}
          </p>
        </div>
      </Paper>
    </>
  );
};

export default WhitePaper;
