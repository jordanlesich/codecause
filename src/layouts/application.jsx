import React, { useState } from "react";
import styled from "styled-components";

import PaperBody from "./paperBody";
import Button from "../components/button";
import { BodyMd, HeaderLg, DisplayMd } from "../styles/typography";
import TextBox from "../components/textBox";
import { getColor } from "../helpers/palette";
import Break from "../components/break";

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
  const [isWritingDM, setIsWritingDM] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleAccept = () => {
    acceptContributor({ id: doc.userID, displayName: doc.displayName }, doc.id);
  };
  const handleDecline = () => {
    declineContributor(
      { id: doc.userID, displayName: doc.displayName },
      doc.id
    );
  };
  const DMmode = () => {
    setIsWritingDM((prevState) => !prevState);
  };
  const handleDM = () => {};
  const handleTyping = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <StyledApplication>
      <HeaderLg className="app-title">{doc.displayName}'s Application</HeaderLg>
      <PaperBody body={doc.body} type="application" />
      {doc.status === "open" && (
        <div className="dm-section">
          {isWritingDM ? (
            <>
              <TextBox
                label={`To ${doc.displayName}`}
                placeholder="Type DM here"
                value={inputVal}
                onType={handleTyping}
                className="dm-input comment-text-box"
              />
              <div className="dm-btn-box">
                <Button
                  fn={DMmode}
                  className="text-button"
                  content="Cancel"
                  fn={DMmode}
                />
                <Button
                  fn={DMmode}
                  className="primary"
                  content="Send"
                  fn={handleDM}
                />
              </div>
            </>
          ) : (
            <>
              <div className="button-box">
                <Button
                  content="Decline"
                  className="text-button text-danger"
                  fn={handleDecline}
                />
                <Button
                  content="Send Message"
                  className="text-button"
                  fn={DMmode}
                />
                <Button
                  content="Accept"
                  className="text-button text-primary"
                  fn={handleAccept}
                />
              </div>
            </>
          )}
        </div>
      )}
      <Break type="soft" />
    </StyledApplication>
  );
};

export default Application;
