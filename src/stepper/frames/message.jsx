import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import { DisplayLg, BodyMd } from "../../styles/typography";

const MessageFrame = styled.div`
  position: relative;

  .list {
    list-style: square;
    margin-left: 1.6rem;
    li {
      margin-bottom: 0.8rem;
    }
  }
`;

const Message = () => {
  const { currentFrame } = useContext(StepperContext);
  const { cardTitle, sideTitle, body } = currentFrame;

  const title = cardTitle || sideTitle || null;

  return (
    <MessageFrame>
      {title && <DisplayLg className="title">{title}</DisplayLg>}
      {body && (
        <div className="body-text">
          {body.type === "list" && (
            <ul className="list">
              {body.listItems.map((str, i) => (
                <li key={i}>
                  <BodyMd>{str}</BodyMd>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </MessageFrame>
  );
};

export default Message;
