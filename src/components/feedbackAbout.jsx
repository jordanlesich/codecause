import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MessageSquare, HelpCircle } from "react-feather";

import { OverlayContext } from "../contexts/overlayContext";
import FeedbackModal from "../modals/feedbackModal";
import Button from "../components/button";
import Break from "../components/break";
import { getColor } from "../helpers/palette";

const FeedbackAboutSection = styled.div`
  padding: 1.6rem 2.4rem;

  .list-button {
    padding: 0;
    font-weight: 400;
    span.icon-wrapper {
      margin-right: 1.2rem;
    }
    svg {
      color: ${getColor("grey500")};
      transition: 0.2s color;
    }
    :hover {
      svg {
        color: ${getColor("grey600")};
      }
    }
  }
  .list-button:first-child {
    margin-bottom: 0.8rem;
  }
`;

const FeedbackAbout = () => {
  const history = useHistory();
  const { openModalWithContent, closeModal } = useContext(OverlayContext);
  const openFeedbackModal = () => {
    openModalWithContent(<FeedbackModal closeModal={closeModal} />);
  };
  const goToCoLab = (e) => {
    history.push("/project/jordan-co-lab");
  };

  return (
    <>
      <Break type="hard" className="break" push="top" />
      <FeedbackAboutSection>
        <Button
          className="text-button list-button"
          withIcon={<HelpCircle size="2.4rem" />}
          content="About Us"
          fn={goToCoLab}
          value="/about"
        />
        <Button
          className="text-button list-button"
          withIcon={<MessageSquare size="2.4rem" />}
          content="Feedback"
          fn={openFeedbackModal}
          value="/feedback"
        />
      </FeedbackAboutSection>
    </>
  );
};

export default FeedbackAbout;
