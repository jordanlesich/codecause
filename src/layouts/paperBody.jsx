import React from "react";
import styled from "styled-components";

import { HeaderMd, BodyMd, HeaderSm, BodySm } from "../styles/typography";
const BodySection = styled.div`
  margin-bottom: 5.6rem;
  .section {
    margin-bottom: 3.2rem;
  }
  .section-heading {
    margin-bottom: 0.8rem;
  }
  .section-sm {
    margin-bottom: 2.4rem;
  }
  &.application {
    margin-bottom: 2.4rem;
  }
`;

const PaperBody = ({ body, type = "whitepaper" }) => {
  return (
    <BodySection className={`${type === "application" && "application"}`}>
      {body &&
        body.map((section) =>
          type === "whitepaper" ? (
            <div className="section" key={section.id || section.label}>
              <HeaderMd className="section-heading">{section.label}:</HeaderMd>
              <BodyMd className="section-body">{section.text}</BodyMd>
            </div>
          ) : (
            <div className="section-sm" key={section.id || section.label}>
              <HeaderSm className="section-heading">{section.label}:</HeaderSm>
              <BodySm className="section-body">{section.text}</BodySm>
            </div>
          )
        )}
    </BodySection>
  );
};

export default PaperBody;
