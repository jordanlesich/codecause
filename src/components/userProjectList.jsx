import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Overline, BodySm } from "../styles/typography";
import { getColor } from "../helpers/palette";

const StyledProjectList = styled.div`
  .no-project-text {
    margin-top: 1.6rem;
    font-style: italic;
  }
  .inner-section {
    max-height: 25vh;
    overflow-y: auto;
    padding: 1.6rem 0.4rem;
    list-style: none;
    a {
      text-decoration-line: none;
      color: ${getColor("primary")};
    }
    li {
      margin-bottom: 1.6rem;
    }
    a:visited {
      color: ${getColor("primary")};
    }
  }
  .side-list-item {
  }
`;

const UserProjectList = ({ contributing, created }) => {
  const generateCreated = () => {
    return (
      <>
        <Overline>My Projects</Overline>
        <ul className="inner-section">
          {created.map((project) => (
            <li>
              <Link to={`projects/${project.slug}`}>
                <BodySm className="side-list-item">{project.name}</BodySm>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  };
  const generateContributing = () => {
    return (
      <>
        <Overline>Contributing</Overline>
        <ul className="inner-section">
          {contributing.map((project) => (
            <li>
              <Link to={`projects/${project.value}`}>
                <BodySm className="side-list-item">{project.name}</BodySm>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const generateList = () => {
    if (!contributing.length && !created.length) {
      return (
        <>
          <Overline>My Projects</Overline>
          <BodySm className="no-project-text">You have no projects</BodySm>;
        </>
      );
    } else if (contributing.length && created.length) {
      return (
        <>
          {generateCreated()} {generateContributing()}{" "}
        </>
      );
    } else if (contributing.length) {
      return generateContributing();
    } else if (created.length) {
      return generateCreated();
    } else return <>Error</>;
  };
  return <StyledProjectList>{generateList()}</StyledProjectList>;
};

export default UserProjectList;
