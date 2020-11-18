import React from "react";
import styled from "styled-components";

import Messages from "../components/messages";
import ApplicationInbox from "../buildmodes/applicationInbox";
import { DisplayLg } from "../styles/typography";
const DashLayout = styled.div`
  .dash-title {
    margin-bottom: 4rem;
  }
  .dash-section {
    margin-bottom: 2.4rem;
  }
`;

const ProjectDashboard = ({ project, removeAlert, reFetch }) => {
  return (
    <DashLayout>
      <DisplayLg className="dash-title">Dashboard</DisplayLg>
      <Messages
        className="dash-section"
        title={"Project Alerts"}
        project={project}
        removeAlert={removeAlert}
      />
      <ApplicationInbox
        className="dash-section"
        project={project}
        removeAlert={removeAlert}
        reFetch={reFetch}
      />
    </DashLayout>
  );
};

export default ProjectDashboard;
