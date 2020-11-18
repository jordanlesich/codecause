import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { BodyMd, DisplayLg, DisplaySm } from "../styles/typography";
import { DashBox, DashboxTitleSection } from "../components/staticElements";

import { Users } from "react-feather";
import Break from "../components/break";
import UserListItem from "../components/UserListItem";
import { removeContributor } from "../actions/contributors";
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

const ManageUsers = ({ project, refetch }) => {
  const [contributors, setContributors] = useState(null);

  useEffect(() => {
    if (project != null) {
      setContributors(project.contributors);
    }
  }, [project]);

  const handleRemoveUser = async (userID) => {
    try {
      const newUsers = await removeContributor(userID, project.slug);
      setContributors(newUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashLayout>
      <DisplayLg className="dash-title">Manage Contributors</DisplayLg>
      <DashBox>
        <div className="top-section">
          <DashboxTitleSection className="display">
            <Users />
            <DisplaySm>Contributors</DisplaySm>
          </DashboxTitleSection>
          <Break type="hard" />
        </div>
        <ul className="dash-list">
          {contributors?.length > 0 ? (
            contributors.map((user) => (
              <li key={user.id}>
                <UserListItem user={user} handleRemoveUser={handleRemoveUser} />
                <Break type="soft" />
              </li>
            ))
          ) : (
            <BodyMd className="no-msg">No Contributors on This Project</BodyMd>
          )}
        </ul>
      </DashBox>
    </DashLayout>
  );
};

export default ManageUsers;
