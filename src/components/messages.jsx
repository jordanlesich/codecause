import React, { useState } from "react";
import { Bell, Trash } from "react-feather";
import styled from "styled-components";

import Message from "./message";
import Button from "./button";
import { DashBox, DashboxTitleSection } from "../components/staticElements";
import { deleteProjectAlert, markAlert } from "../actions/messages";
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

const Messages = ({ title, className, project }) => {
  const [messages, setMessages] = useState(null);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (project != null) {
      setMessages(formatMessages(project.alerts));
    }
  }, [project]);

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

  const handleDelete = async () => {
    try {
      const newMsgs = await deleteProjectAlert(project.slug, messages);
      setMessages(formatMessages(newMsgs));
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const newMsgs = await markAlert(project.slug, messages, id);
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
            <DisplaySm>
              <Bell />
              {title}
            </DisplaySm>
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
              return (
                <Message
                  key={message.id}
                  message={message}
                  toggleChecked={toggleChecked}
                  isChecked={message.isChecked}
                  markAsRead={markAsRead}
                />
              );
            })
          ) : (
            <BodyMd className="no-msg">No Messages in Inbox</BodyMd>
          )}
        </ul>
      </DashBox>
    </StyledInbox>
  );
};

export default Messages;
