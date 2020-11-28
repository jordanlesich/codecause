import React, { useState } from "react";
import { Trash } from "react-feather";
import styled from "styled-components";

import AlertMessage from "./alertMessage";
import DM from "./DM";
import Button from "./button";
import { DashBox, DashboxTitleSection } from "../components/staticElements";

import { BodyMd, DisplaySm } from "../styles/typography";
import Break from "./break";
import { getColor } from "../helpers/palette";
import { useEffect } from "react";

const StyledInbox = styled.div`
  .delete {
    margin-left: auto;
  }
  .no-msg {
    padding: 0.8rem;
    font-style: italic;
    color: ${getColor("grey400")};
  }
`;

const formatMessages = (messages) => {
  return Object.values(messages)
    .sort((a, b) => (a.timeSent > b.timeSent ? 1 : -1))
    .map((message) => ({ ...message, isChecked: false }));
};

const Inbox = ({
  title,
  className,
  msgProps,
  withIcon,
  deleteMessage,
  markMessage,
  messageType,
  fetchMessages,
}) => {
  const [messages, setMessages] = useState(null);
  const [canDelete, setCanDelete] = useState(false);

  //This component really needs to be separated to prevent
  //stuff like this TODO: separate this component
  useEffect(() => {
    const handleFetch = async () => {
      const msgs = await fetchMessages(msgProps.id);
      setMessages(formatMessages(msgs));
    };
    if (msgProps) {
      if (fetchMessages) {
        handleFetch();
      } else {
        setMessages(formatMessages(msgProps));
      }
    }
  }, [msgProps, fetchMessages]);

  const handleDelete = async () => {
    try {
      const newMsgs = await deleteMessage(messages);
      setMessages(formatMessages(newMsgs));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleChecked = (id) => {
    const newMessages = messages.map((m) => {
      if (m.id === id) {
        return { ...m, isChecked: !m.isChecked };
      } else {
        return m;
      }
    });
    if (newMessages.some((msg) => msg.isChecked)) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
    setMessages(newMessages);
  };

  const markAsRead = async (id) => {
    try {
      const newMsgs = await markMessage(messages, id);
      setMessages(formatMessages(newMsgs));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledInbox className={className}>
      <DashBox>
        <div className="top-section">
          <DashboxTitleSection className="display">
            {withIcon}
            <DisplaySm>{title}</DisplaySm>
            <Button
              iconButton={<Trash />}
              disabled={!canDelete}
              className="icon-button delete"
              fn={handleDelete}
            />
          </DashboxTitleSection>
        </div>
        <Break type="hard" />

        <ul>
          {messages?.length ? (
            messages.map((message) => {
              if (messageType === "alert") {
                return (
                  <AlertMessage
                    key={message.id}
                    message={message}
                    toggleChecked={toggleChecked}
                    isChecked={message.isChecked}
                    markAsRead={markAsRead}
                  />
                );
              } else {
                return (
                  <DM
                    key={message.id}
                    message={message}
                    toggleChecked={toggleChecked}
                    isChecked={message.isChecked}
                    markAsRead={markAsRead}
                  />
                );
              }
            })
          ) : (
            <BodyMd className="no-msg">No Messages in Inbox</BodyMd>
          )}
        </ul>
      </DashBox>
    </StyledInbox>
  );
};

export default Inbox;
