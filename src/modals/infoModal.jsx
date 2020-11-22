import React from "react";
import styled from "styled-components";

import Button from "../components/button";
import { DisplaySm, BodyMd, HeaderSm } from "../styles/typography";
import { ButtonBox, ModalBox } from "../components/staticElements";
import Break from "../components/break";

const StyledInfoModal = styled.div`
  .title {
    margin-bottom: 0.8rem;
  }
  .light-heading {
    margin-bottom: 0.8rem;
  }
  .body {
    margin-bottom: 2.4rem;
  }
  .divider {
    margin-bottom: 1.6rem;
  }
  .divider-lg {
    margin-bottom: 2.4rem;
  }
  .btn-box {
    margin-top: 2.4rem;
  }
  ul {
    list-style: none;
  }
`;

const InfoModal = ({ title = "info", sections = [], closeModal }) => {
  return (
    <StyledInfoModal>
      <ModalBox>
        <DisplaySm className="title">{title}</DisplaySm>
        <Break type="soft" className="divider-lg" />
        <ul>
          {sections.map((section, index) => {
            return (
              <li key={`${section.heading}-${index}`}>
                <HeaderSm className="light-heading">{section.heading}</HeaderSm>
                <BodyMd className="body">{section.body}</BodyMd>
                <Break type="soft" className="divider" />
              </li>
            );
          })}
        </ul>
        <ButtonBox className="btn-box">
          <Button className="primary" content="Got it" fn={closeModal} />
        </ButtonBox>
      </ModalBox>
    </StyledInfoModal>
  );
};

export default InfoModal;
