import React from "react";
import styled from "styled-components";
import { FolderPlus, MoreVertical, User } from "react-feather";

import Button from "./button";
import { OverlayContext } from "../contexts/overlayContext";
import { BodySm, BoldText, StyledLink } from "../styles/typography";
import { getColor } from "../helpers/palette";
import { format } from "date-fns";
import { manageRoles } from "../copy/comingSoon";
import ComingSoon from "../modals/comingSoon";
import Warning from "../modals/warning";
import { useHistory } from "react-router";

const StyledProjectItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;

  .project-button {
    padding: 1.1rem 0;
    width: 30%;
    color: ${getColor("blue400")};
    :hover,
    :focus {
      color: ${getColor("blue200")};
    }
    :visited {
      ${getColor("blue400")}
    }
  }
  .role {
    width: 30%;
  }
  .date {
    margin-left: auto;
    margin-right: 2.4rem;
  }
`;

const UserListItem = ({ project, role, dateInfo }) => {
  const history = useHistory();
  const goToProject = () => {
    history.push(`/project/${project.slug}`);
  };

  return (
    <StyledProjectItem key={project.id}>
      <Button
        className="project-button"
        content={project.name}
        withIcon={<FolderPlus />}
        fn={goToProject}
      />
      <BodySm className="role">
        <BoldText>Role: </BoldText>
        {role}
      </BodySm>
      <BodySm className="date">
        <BoldText>{dateInfo.label}</BoldText>
        {format(dateInfo.date, "MM/dd/yyyy")}
      </BodySm>
    </StyledProjectItem>
  );
};

export default UserListItem;
