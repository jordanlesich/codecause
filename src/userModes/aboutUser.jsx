import React, { useContext } from "react";
import { Award, Mail, User } from "react-feather";

import styled from "styled-components";
import Break from "../components/break";
import Button from "../components/button";
import { OverlayContext } from "../contexts/overlayContext";
import DMmodal from "../modals/DMmodal";
import { DisplayLg } from "../styles/typography";
import MockDashList from "./mockDash";
import ProjectList from "./projectList";

const DashLayout = styled.div`
  .dash-title {
    margin-bottom: 4rem;
  }
  .dash-section {
    margin-bottom: 2.4rem;
  }
  .divider {
    margin-top: 4rem;
  }
  .button-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 2.4rem;
  }
`;

const AboutUser = ({ user }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);

  const openDMmodal = () => {
    openModalWithContent(
      <DMmodal recipient={user.displayName} closeModal={closeModal} />
    );
  };

  return (
    <>
      {user && (
        <DashLayout>
          <DisplayLg className="dash-title">{user.displayName}</DisplayLg>
          <MockDashList
            title={`${user.displayName}'s Bio`}
            titleIcon={<User />}
            noMsg="This user doesn't have a bio yet."
            className="dash-section"
          />
          <ProjectList
            user={user}
            title="Projects Created"
            field="projectsCreated"
            dateInfo={{ field: "timeCreated", label: "Project Created: " }}
            emptyMsg="This user hasn't created any projects"
            className="dash-section"
          />
          <MockDashList
            title="Awards"
            titleIcon={<Award />}
            noMsg="This user hasn't recieved any rewards. (Awards are not yet available)"
            className="dash-section"
          />
          <Break type="hard" className="divider" />
          <div className="button-box">
            <Button
              content={`Send ${user.displayName} a DM`}
              className="secondary"
              withIcon={<Mail />}
              fn={openDMmodal}
            />
          </div>
        </DashLayout>
      )}
    </>
  );
};

export default AboutUser;
