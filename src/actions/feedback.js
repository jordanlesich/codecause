import { db } from "../base";
import { v4 as uuidv4 } from "uuid";

export const sendFeedback = async (sender, subject, body) => {
  const id = uuidv4();
  const feedbackMessage = {
    id,
    from: sender.displayName,
    status: "unread",
    subject,
    body,
    sender,
    timeSent: Date.now(),
  };

  db.collection("feedback")
    .doc("main")
    .update({
      [id]: feedbackMessage,
    })
    .then(() => {
      console.log("message sent");
    });
};
