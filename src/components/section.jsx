import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  margin: 3rem 6rem 3rem 4rem;
  line-height: 32px;
  font-size: 1.2rem;
  letter-spacing: -0.003em;
  font-style: normal;
  font-weight: 400;
  .heading {
    font-size: 1.8rem;
    letter-spacing: -0.022em;
    font-weight: 600;
    margin-bottom: 0.5rem;
    word-break: break-word;
    padding-right: 6rem;
  }
  p {
    padding-top: 0.5rem;
    padding-right: 6rem;
  }
`;

const Section = ({ label, children, className }) => {
  return (
    <StyledSection className={className}>
      <h3 className="heading">{label}</h3>
      {children}
    </StyledSection>
  );
};

export default Section;
