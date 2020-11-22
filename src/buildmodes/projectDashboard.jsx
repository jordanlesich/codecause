import React from "react";
import styled from "styled-components";

import Inbox from "../components/inbox";
import ApplicationInbox from "../buildmodes/applicationInbox";
import { DisplayLg } from "../styles/typography";
import { deleteProjectAlert, markProjectAlert } from "../actions/messages";
import { Bell } from "react-feather";

const DashLayout = styled.div`
  .dash-title {
    margin-bottom: 4rem;
  }
  .dash-section {
    margin-bottom: 2.4rem;
  }
`;

const ProjectDashboard = ({ project, removeAlert, reFetch }) => {
  const handleDeleteAlert = async (messages) => {
    return deleteProjectAlert(project.slug, messages);
  };
  const handleMarkAsRead = async (messages, id) => {
    return markProjectAlert(project.slug, messages, id);
  };

  return (
    <DashLayout>
      <DisplayLg className="dash-title">Dashboard</DisplayLg>
      <Inbox
        className="dash-section"
        title="Project Alerts"
        msgProps={project?.alerts}
        withIcon={<Bell />}
        messageType="alert"
        deleteMessage={handleDeleteAlert}
        markMessage={handleMarkAsRead}
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
