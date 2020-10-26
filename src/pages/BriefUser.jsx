import React from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";

import Button from "../components/button";
import { useAuth } from "../Hooks/useAuth";
import { DisplayLg, HeaderLg, BodyMd } from "../styles/typography";

const Briefing = styled.main`
  width: 48rem;
  .section {
    margin-bottom: 4rem;
  }
  .title,
  .heading {
    margin-bottom: 0.8rem;
  }
  .button-section {
    display: flex;
    button {
      margin-right: 1.6rem;
    }
  }
`;

const BriefUser = () => {
  const { user } = useAuth();
  const history = useHistory();

  const handleStartStepper = () => {
    history.push("/create/0/0");
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Briefing>
      <div className="brief-panel">
        <div className="section">
          <DisplayLg className="title">Insert Title Here</DisplayLg>
          <BodyMd>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            consequatur adipisci, eos itaque doloremque reprehenderit quibusdam
            aut nisi.
          </BodyMd>
        </div>
        <div className="section">
          <HeaderLg className="heading">Insert Title Here</HeaderLg>
          <BodyMd>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            consequatur adipisci.
          </BodyMd>
        </div>
        <div className="section">
          <HeaderLg className="heading">Insert Title Here</HeaderLg>
          <BodyMd>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. M
          </BodyMd>
        </div>
        <div className="button-section">
          <Button className="secondary" content="Back" />
          <Button
            className="primary"
            content="Continue"
            fn={handleStartStepper}
          />
        </div>
      </div>
    </Briefing>
  );
};

export default BriefUser;
