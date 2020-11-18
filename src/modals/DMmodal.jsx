import React, { useState } from "react";

import { sendDM } from "../actions/messages";
import TextBox from "../components/textBox";
import Input from "../components/input";
import DynamicSectionTemplate from "./DynamicSectionTemplate";
import { useAuth } from "../Hooks/useAuth";

const DMmodal = ({ recipient, closeModal }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [DM_bodyText, setDM_bodyText] = useState("");
  const [DM_subjectText, setDM_subjectText] = useState("");

  const handleBodyTyping = (e) => setDM_bodyText(e.target.value);
  const handleSubjectTyping = (e) => setDM_subjectText(e.target.value);

  const handleSendDM = async () => {
    setLoading(true);
    try {
      await sendDM(recipient, user, DM_subjectText, DM_bodyText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  return (
    <DynamicSectionTemplate
      title={`Send ${recipient.displayName} a message`}
      onSubmit={handleSendDM}
      onCancel={closeModal}
      loading={loading}
      disableSubmit={DM_bodyText === "" && DM_subjectText === ""}
    >
      <Input
        label="Subject"
        className="dynamic-section-input"
        value={DM_subjectText}
        onType={handleSubjectTyping}
      />
      <TextBox
        label="Body"
        className="dynamic-section-input"
        value={DM_bodyText}
        onType={handleBodyTyping}
      />
    </DynamicSectionTemplate>
  );
};

export default DMmodal;
