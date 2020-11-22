import React from "react";
import styled from "styled-components";

import Inbox from "../components/inbox";
import { DisplayLg } from "../styles/typography";
import { Bell, Mail } from "react-feather";
import {
  getDMs,
  getUserAlerts,
  markDM,
  deleteDM,
  deleteUserAlert,
  markUserAlert,
} from "../actions/messages";

const DashLayout = styled.div`
  .dash-title {
    margin-bottom: 4rem;
  }
  .dash-section {
    margin-bottom: 2.4rem;
  }
`;

const UserMainDash = ({ user }) => {
  const handleMarkAlert = async (messages, id) => {
    return markUserAlert(user.id, messages, id);
  };
  const handleDeleteAlert = async (messages) => {
    return deleteUserAlert(user.id, messages);
  };
  const handleDeleteDM = async (messages, id) => {
    return deleteDM(user.id, messages, id);
  };
  const handleMarkDM = async (messages, id) => {
    return markDM(user.id, messages, id);
  };

  return (
    <DashLayout>
      <DisplayLg className="dash-title">Dashboard</DisplayLg>
      <Inbox
        className="dash-section"
        title="Alerts"
        msgProps={user}
        withIcon={<Bell />}
        messageType="alert"
        fetchMessages={getUserAlerts}
        markMessage={handleMarkAlert}
        deleteMessage={handleDeleteAlert}
      />
      <Inbox
        className="dash-section"
        title="Direct Messages"
        msgProps={user}
        withIcon={<Mail />}
        messageType="DM"
        fetchMessages={getDMs}
        markMessage={handleMarkDM}
        deleteMessage={handleDeleteDM}
      />
    </DashLayout>
  );
};

export default UserMainDash;
