import React from "react";
import styled from "styled-components";

import { BodyMd, DisplaySm } from "../styles/typography";
import { DashBox, DashboxTitleSection } from "../components/staticElements";

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

const MockDashList = ({ title, titleIcon, noMsg, className }) => {
  return (
    <DashLayout className={className}>
      <DashBox>
        <div className="top-section">
          <DashboxTitleSection className="display">
            {titleIcon}
            <DisplaySm>{title}</DisplaySm>
          </DashboxTitleSection>
          <Break type="hard" />
        </div>
        <ul className="dash-list">
          <BodyMd className="no-msg">{noMsg}</BodyMd>
        </ul>
      </DashBox>
    </DashLayout>
  );
};

export default MockDashList;
