import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";

const Paper = styled.div`
  grid-column: 3/4;
  background-color: ${getColor("white")};
  border: 1px solid ${getColor("lightBorder")};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: none;
  color: rgba(41, 41, 41, 1);
  padding-top: 3rem;

  .paper-title {
    line-height: 48px;
    font-size: 3.2rem;
    font-weight: 300;
    margin: 0rem 6rem 3rem 4rem;
  }

  .section,
  .sub-section {
    padding: 1rem;
    line-height: 32px;
    font-size: 1.2rem;
    letter-spacing: -0.003em;
    font-style: normal;
    font-weight: 400;
  }

  .section {
    margin: 1rem 1rem 0rem 3rem;
    line-height: 40px;
  }
  .sub-section {
    margin: 0 1rem 1rem 5rem;
  }
  .heading {
    font-size: 1.8rem;
    letter-spacing: -0.022em;
    font-weight: 600;
    margin-bottom: 0.5rem;
    word-break: break-word;
    padding-right: 6rem;
  }
  .sub-heading {
    font-weight: 500;
  }
  p {
    padding-top: 0.5rem;
    padding-right: 6rem;
  }
  .editable {
    border-top: 1px solid rgba(0, 0, 0, 0);
    transition: 0.2s all;
  }
  .editable:hover {
    border-top: 1px solid ${getColor("lightBorder")};
  }
`;

const WhitePaper = ({ title, fields }) => {
  return (
    <>
      <Paper>
        {title && <h2 className="paper-title">{title || "Error: No Title"}</h2>}
        {fields.map((field) => {
          return (
            <div key={field.question} className={"section"}>
              <h3 className="heading">{field.question}</h3>
              <p className="response editable">{field.answer}</p>
            </div>
          );
        })}
      </Paper>
    </>
  );
};

export default WhitePaper;
