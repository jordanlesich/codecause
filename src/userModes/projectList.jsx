import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { BodyMd, DisplaySm } from "../styles/typography";
import { DashBox, DashboxTitleSection } from "../components/staticElements";

import ProjectDashItem from "../components/projectDashItem";
import { Tool } from "react-feather";
import Break from "../components/break";
import { getColor } from "../helpers/palette";

const DashLayout = styled.div`
  .dash-list {
    list-style: none;
  }
  .dash-title {
    margin-bottom: 4rem;
  }
  .dash-section {
    margin-bottom: 2.4rem;
  }
  .no-msg {
    padding: 0.8rem;
    font-style: italic;
    color: ${getColor("grey400")};
  }
`;

const ProjectList = ({ user, className }) => {
  const [projectsCreated, setProjectsCreated] = useState(null);
  const [projectsContributing, setProjectsContributing] = useState(null);

  useEffect(() => {
    if (user != null) {
      setProjectsCreated(user.projectsCreated);
      setProjectsContributing(user.projectsContributing);
    }
  }, [user]);

  const displayProjects = () => {
    if (!projectsCreated.length && !projectsContributing.length) {
      return (
        <BodyMd className="no-msg">
          This user is not affiliated with any projects
        </BodyMd>
      );
    } else {
      return (
        <>
          {projectsCreated.map((project) => (
            <li key={project.id}>
              <ProjectDashItem
                project={project}
                role="Creator"
                dateInfo={{ label: "Created At: ", date: project.timeCreated }}
              />
              <Break type="soft" />
            </li>
          ))}
          {projectsContributing.map((project) => (
            <li key={project.id}>
              <ProjectDashItem
                project={project}
                role="Contributo"
                dateInfo={{ label: "Time Joined: ", date: project.timeJoined }}
              />
              <Break type="soft" />
            </li>
          ))}
        </>
      );
    }
  };

  return (
    <DashLayout className={className}>
      <DashBox>
        <div className="top-section">
          <DashboxTitleSection className="display">
            <Tool />
            <DisplaySm>Affiliated Projects</DisplaySm>
          </DashboxTitleSection>
          <Break type="hard" />
        </div>
        <ul className="dash-list">
          {projectsContributing && projectsCreated && displayProjects()}
        </ul>
      </DashBox>
    </DashLayout>
  );
};

export default ProjectList;
