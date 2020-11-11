import React from "react";
import styled from "styled-components";
import { MessageCircle, Users } from "react-feather";

import Button from "../components/button";
import Votes from "../components/votes";
import Break from "../components/break";
import { getColor } from "../helpers/palette";
import { useHistory } from "react-router";

const StyledPaperFooter = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 4rem;
  .comment-text-box {
    margin-bottom: 0.4rem;
  }
  .button-box {
    display: flex;
    width: 100%;
    margin-bottom: 4rem;
    button:last-child {
      margin-left: auto;
    }
    button:first-child {
      margin-right: 1.6rem;
    }
  }
  .comments-root {
    list-style: none;
  }
  .list-divider {
    margin-bottom: 4rem;
  }
`;

const PaperFooter = ({ commentCount, toggleComments, project, isInvolved }) => {
  const history = useHistory();
  const applyToProject = () => {
    history.push(`/project/${project.slug}/apply/0/0`);
  };
  const toProjectDashboard = () => {
    //TODO authenticate
    history.push(`/build/${project.id}`);
  };
  return (
    <StyledPaperFooter>
      <Break type="hard" className="list-divider" />
      <div className="button-box">
        <Votes project={project} className={"full-button"} />
        <Button
          fn={toggleComments}
          className="secondary"
          content={`Discussion (${commentCount})`}
          withIcon={<MessageCircle color={getColor("grey500")} size="2rem" />}
        />
        {isInvolved ? (
          <Button
            className="primary"
            withIcon={<Users color={getColor("white")} size="2rem" />}
            content="Members View"
            fn={toProjectDashboard}
          />
        ) : (
          <Button
            className="primary"
            withIcon={<Users color={getColor("white")} size="2rem" />}
            content="Join Up"
            fn={applyToProject}
          />
        )}
      </div>
    </StyledPaperFooter>
  );
};

export default PaperFooter;
