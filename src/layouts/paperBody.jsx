import React from "react";
import styled from "styled-components";

import { HeaderMd, BodyMd } from "../styles/typography";
const BodySection = styled.div`
  .section {
    margin-bottom: 3.2rem;
  }
  .section-heading {
    margin-bottom: 0.8rem;
  }
`;

const PaperBody = ({ body }) => {
  return (
    <BodySection>
      {body.map((section) => (
        <div className="section" key={section.id}>
          <HeaderMd className="section-heading">{section.label}:</HeaderMd>
          <BodyMd className="section-body">{section.text}</BodyMd>
        </div>
      ))}
    </BodySection>
  );
};

export default PaperBody;
