import React, { useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { CheckSquare, Square } from "react-feather";
import kebabCase from "lodash.kebabcase";

import Break from "./break";
import Button from "./button";
import { BodySm, Overline } from "../styles/typography";
import { getColor } from "../helpers/palette";
import DMmodal from "../modals/DMmodal";
import { useContext } from "react";
import { OverlayContext } from "../contexts/overlayContext";

const StyledMessage = styled.div`
  display: flex;
  border-radius: 4px;
  align-items: flex-start;
  width: 100%;
  .from {
    margin-right: 2.4rem;
  }
  .msg {
    font-weight: 400;
  }
  .time-sent {
    margin-left: auto;
    font-weight: 400;
  }

  .check-button {
    margin-right: 0.8rem;
    margin-top: 0.8rem;
    transform: translateY(-0.2rem);
  }
  .msg-button {
    padding: 0.8rem 0;
    height: fit-content;
  }
  .full-message {
    margin: 0.8rem 0;
    width: 100%;
    position: relative;
  }
  .header-line {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
  }
  .full-message > .collapse-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 1.5rem;
    color: ${getColor("grey400")};
  }
  .marked-as-read {
    opacity: 0.5;
  }
  .sm-label {
    margin-right: 0.4rem;
  }
  .subject {
    margin-bottom: 1.6rem;
  }
  .reply {
    margin-top: 1.6rem;
    color: ${getColor("blue300")};
    text-transform: uppercase;
  }
`;
const handleMsgPreview = (msg) => {
  return msg.length > 50 ? msg.slice(0, 50) + "..." : msg;
};
const DM = ({ message, isChecked = false, toggleChecked, markAsRead }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);
  const [collapsed, setCollapsed] = useState(true);

  const openReplyModal = () => {
    openModalWithContent(
      <DMmodal closeModal={closeModal} recipient={message.sender} />
    );
  };
  const toggleCollapsed = () => {
    if (message.status === "unread") {
      markAsRead(message.id);
    }
    setCollapsed((prevState) => !prevState);
  };
  const handleChecked = () => {
    toggleChecked(message.id);
  };

  return (
    <>
      <StyledMessage>
        <Button
          className="icon-button check-button"
          fn={handleChecked}
          iconButton={
            isChecked ? <CheckSquare size="2rem" /> : <Square size="2rem" />
          }
        />
        {collapsed ? (
          <>
            <Button
              className={`text-button long-button msg-button ${
                message.status === "read" && "marked-as-read"
              }`}
              fn={toggleCollapsed}
              content={
                <>
                  <BodySm className="from">{message.sender}</BodySm>
                  <BodySm className="msg">
                    {handleMsgPreview(message.subject)}
                  </BodySm>

                  <BodySm className="time-sent">
                    {formatDistanceToNow(message.timeSent)} ago
                  </BodySm>
                </>
              }
            />
          </>
        ) : (
          <div className="full-message">
            <div className="header-line">
              <Overline className="sm-label">From: </Overline>{" "}
              <BodySm>{message.sender}</BodySm>
            </div>
            <div className="header-line">
              <Overline className="sm-label">To:</Overline>{" "}
              <BodySm> {message.recipient} </BodySm>
            </div>
            <div className="header-line">
              <Overline className="sm-label">Sent: </Overline>
              <BodySm>{formatDistanceToNow(message.timeSent)} ago</BodySm>
            </div>
            <Overline className="sm-label">Subject:</Overline>
            <BodySm className="subject">{message.subject}</BodySm>
            <Overline className="sm-label">Body:</Overline>
            <BodySm>{message.body}</BodySm>
            <Button
              fn={openReplyModal}
              content="Reply"
              className="text-button reply"
            />
            <Button
              fn={toggleCollapsed}
              className="text-button collapse-button"
              content="Collapse"
            />
          </div>
        )}
      </StyledMessage>
      <Break type="soft" />
    </>
  );
};

export default DM;
