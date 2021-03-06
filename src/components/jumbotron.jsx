import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import { DisplayLg, BodyMd, HeaderMd } from "../styles/typography";

const Briefing = styled.main`
  width: 48rem;
  .section {
    margin-bottom: 4rem;
  }
  .title,
  .heading {
    margin-bottom: 0.8rem;
  }
  .button-section {
    display: flex;
    button {
      margin-right: 1.6rem;
    }
  }
`;

const Jumbotron = ({ copy, buttonSection }) => {
  const { user } = useAuth();
  const { onlyTitle, titleParagraph, restParagraphs } = copy;

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Briefing>
      <div className="brief-panel">
        {onlyTitle ? (
          <DisplayLg className="title">{onlyTitle}</DisplayLg>
        ) : (
          <div className="section">
            <DisplayLg className="title">{titleParagraph.title}</DisplayLg>
            <BodyMd>{titleParagraph.body}</BodyMd>
          </div>
        )}
        {restParagraphs &&
          restParagraphs.map((section, index) => {
            return (
              <div className="section" key={index}>
                <HeaderMd>{section.heading}</HeaderMd>
                <BodyMd>{section.body}</BodyMd>
              </div>
            );
          })}
        <div className="button-section">{buttonSection}</div>
      </div>
    </Briefing>
  );
};

export default Jumbotron;
