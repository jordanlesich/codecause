import React, { useState } from "react";
import { Bell } from "react-feather";
import styled from "styled-components";

import Message from "./message";
import { DashBox, DashboxTitleSection } from "../components/staticElements";
import { DisplaySm } from "../styles/typography";
import Break from "./break";
import { useEffect } from "react";

const StyledInbox = styled.div``;

const formatMessages = (messages) => {
  return Object.values(messages)
    .sort((a, b) => (a.timeSent > b.timeSent ? 1 : -1))
    .map((message) => ({ ...message, isChecked: false }));
};

const Messages = ({ title, className, project }) => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (project != null) {
      setMessages(formatMessages(project.alerts));
    }
  }, [project]);

  const toggleChecked = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((m) => {
        if (m.id === id) {
          return { ...m, isChecked: !m.isChecked };
        } else {
          return m;
        }
      })
    );
  };
  //   console.log(alerts);
  return (
    <StyledInbox className={className}>
      <DashBox>
        <div className="top-section">
          <DashboxTitleSection className="display">
            <DisplaySm>
              <Bell />
              {title}
            </DisplaySm>
          </DashboxTitleSection>
        </div>
        <Break type="hard" />
        {messages &&
          messages.map((message) => {
            return (
              <Message
                key={message.id}
                message={message}
                toggleChecked={toggleChecked}
                isChecked={message.isChecked}
              ></Message>
            );
          })}
      </DashBox>
    </StyledInbox>
  );
};

export default Messages;
