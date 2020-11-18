import React, { useState } from "react";
import { Edit } from "react-feather";
import styled from "styled-components";

import Break from "../components/break";
import { DashBox, DashboxTitleSection } from "../components/staticElements";
import { BodyMd, DisplayLg, DisplaySm } from "../styles/typography";
import PaperBody from "../layouts/paperBody";
import Button from "../components/button";
import { getColor } from "../helpers/palette";

const DashSection = styled.div`
  .dash-title {
    margin-bottom: 4rem;
  }
  .dash-section {
    margin-bottom: 2.4rem;
  }
  .break {
    margin-bottom: 2.4rem;
  }
  .edit-section-title {
    color: ${getColor("blue300")};
  }
`;

const EditMenu = ({ project, setEditMode }) => {
  const editProjectBody = () => {
    setEditMode("editBody");
  };

  return (
    <DashSection>
      <DisplayLg className="dash-title">Edit Project Document</DisplayLg>
      <DashBox className="dash-section">
        <div className="top-section">
          <DashboxTitleSection className="display">
            <Edit />
            <DisplaySm>Edit Title Data</DisplaySm>
          </DashboxTitleSection>
          <Break type="hard" className="break" />

          <BodyMd>This feature is not yet available</BodyMd>
        </div>
      </DashBox>
      <DashBox className="dash-section">
        <div className="top-section">
          <Button
            fn={editProjectBody}
            content={
              <DashboxTitleSection className="display">
                <Edit />
                <DisplaySm>Edit Body Text</DisplaySm>
              </DashboxTitleSection>
            }
            className="text-button edit-section-title"
          />
          <Break type="hard" className="break" />
          {project && <PaperBody body={project.body} />}
        </div>
      </DashBox>
      <DashBox className="dash-section">
        <div className="top-section">
          <DashboxTitleSection className="display">
            <Edit />
            <DisplaySm>Edit Comments</DisplaySm>
          </DashboxTitleSection>
          <Break type="hard" className="break" />
          {/* {project && <PaperFooter body={project.body} />} */}
          <BodyMd>This feature is not yet available</BodyMd>
        </div>
      </DashBox>
    </DashSection>
  );
};

export default EditMenu;
