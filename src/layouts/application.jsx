import React, { useState } from "react";
import styled from "styled-components";

import PaperBody from "./paperBody";
import Button from "../components/button";
import { HeaderLg } from "../styles/typography";
import TextBox from "../components/textBox";
import { getColor } from "../helpers/palette";
import Break from "../components/break";
import { useContext } from "react";
import { OverlayContext } from "../contexts/overlayContext";
import DMmodal from "../modals/DMmodal";

const StyledApplication = styled.article`
  margin-top: 1.6rem;
  /* margin-left: 1.6rem; */
  /* padding: 1.6rem 4rem 0 4rem; */
  /* border-left: 1px solid ${getColor("lightBorder")}; */
  .text-danger {
    color: ${getColor("red400")};
  }
  .text-primary {
    color: ${getColor("primary")};
  }
  .text-button {
    text-transform: uppercase;
  }
  .app-title {
    margin-bottom: 2.4rem;
  }
  .button-box {
    display: flex;
    padding-bottom: 1.6rem;
    button {
      margin-right: 2.4rem;
    }
  }
  .dm-btn-box {
    display: flex;
    align-items: center;
    button:first-child {
      margin-right: auto;
    }
  }
`;

const Application = ({ doc, acceptContributor, declineContributor }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);

  const handleAccept = () => {
    acceptContributor({ id: doc.userID, displayName: doc.displayName }, doc.id);
  };
  const handleDecline = () => {
    declineContributor(
      { id: doc.userID, displayName: doc.displayName },
      doc.id
    );
  };
  const handleDM = () => {
    openModalWithContent(
      <DMmodal recipient={doc.displayName} closeModal={closeModal} />
    );
  };

  return (
    <StyledApplication>
      <HeaderLg className="app-title">{doc.displayName}'s Application</HeaderLg>
      <PaperBody body={doc.body} type="application" />

      <div className="button-box">
        <Button
          content="Decline"
          className="text-button text-danger"
          fn={handleDecline}
        />
        <Button content="Send Message" className="text-button" fn={handleDM} />
        <Button
          content="Accept"
          className="text-button text-primary"
          fn={handleAccept}
        />
      </div>
      <Break type="soft" />
    </StyledApplication>
  );
};

export default Application;
