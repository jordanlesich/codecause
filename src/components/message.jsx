import React, { useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { CheckSquare, Square } from "react-feather";

import Break from "./break";
import Button from "./button";
import { BodyMd, HeaderSm, BodySm } from "../styles/typography";
import { getColor } from "../helpers/palette";
// import { getColor } from "../helpers/palette";

const StyledMessage = styled.div`
  display: flex;
  border-radius: 4px;
  align-items: center;
  width: 100%;
  .from {
    margin-right: 2.4rem;
  }
  .msg {
    margin-right: 2.4rem;
    font-weight: 400;
  }
  .time-sent {
    margin-left: auto;
    font-weight: 400;
  }

  .check-button {
    margin-right: 1.6rem;
    margin-left: 0.8rem;
  }
  .full-message {
    margin: 1.6rem 0.8rem;
    width: 100%;
    position: relative;
  }
  .header-line {
    display: flex;
    margin-bottom: 0.8rem;
    h4 {
      margin-bottom: 0.8rem;
      margin-right: 0.4rem;
    }
  }
  .full-message > .collapse-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 1.5rem;
    color: ${getColor("grey400")};
  }
  &.marked-as-read {
    background-color: ${getColor("grey100")};
  }
`;
const handleMsgPreview = (msg) => {
  return msg.length > 50 ? msg.slice(0, 50) + "..." : msg;
};
const Message = ({ message, isChecked = false, toggleChecked, markAsRead }) => {
  const [collapsed, setCollapsed] = useState(true);
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
      <StyledMessage
        className={message.status === "read" && collapsed && "marked-as-read"}
      >
        {collapsed ? (
          <>
            <Button
              className="icon-button check-button"
              fn={handleChecked}
              iconButton={isChecked ? <CheckSquare /> : <Square />}
            />
            <Button
              className="text-button long-button"
              fn={toggleCollapsed}
              content={
                <>
                  <BodyMd className="from">{message.sender}</BodyMd>
                  <BodySm className="msg">
                    {handleMsgPreview(message.content)}
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
              <HeaderSm>From:</HeaderSm> <BodyMd>{message.sender}</BodyMd>
            </div>
            <div className="header-line">
              <HeaderSm>To:</HeaderSm> <BodyMd>{message.recipient} </BodyMd>
            </div>
            <div className="header-line">
              <HeaderSm>Sent:</HeaderSm>
              <BodyMd>{formatDistanceToNow(message.timeSent)} ago</BodyMd>
            </div>
            <HeaderSm>Message:</HeaderSm>
            <BodyMd>{message.content}</BodyMd>
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

export default Message;
