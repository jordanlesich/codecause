import React, { useState } from "react";

import { sendFeedback } from "../actions/feedback";
import TextBox from "../components/textBox";
import Input from "../components/input";
import DynamicSectionTemplate from "./DynamicSectionTemplate";
import { useAuth } from "../Hooks/useAuth";

const FeedbackModal = ({ closeModal }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bodyText, setBodyText] = useState("");
  const [subjectText, setSubjectText] = useState("");

  const handleBodyTyping = (e) => setBodyText(e.target.value);
  const handleSubjectTyping = (e) => setSubjectText(e.target.value);

  const handleSendFeedback = async () => {
    setLoading(true);
    try {
      await sendFeedback(user, subjectText, bodyText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  return (
    <DynamicSectionTemplate
      title={`Tell us what you think`}
      onSubmit={handleSendFeedback}
      onCancel={closeModal}
      loading={loading}
      disableSubmit={bodyText === "" && subjectText === ""}
    >
      <Input
        label="What is this about?"
        className="dynamic-section-input"
        value={subjectText}
        onType={handleSubjectTyping}
      />
      <TextBox
        label="What's on your mind?"
        className="dynamic-section-input"
        value={bodyText}
        onType={handleBodyTyping}
      />
    </DynamicSectionTemplate>
  );
};

export default FeedbackModal;
