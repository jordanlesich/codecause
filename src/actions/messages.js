import { db } from "../base";
import { v4 as uuidv4 } from "uuid";

// id : {
//     id: String
//     recipient: String,
//     sender: String,
//     status: String,
//     type: String,
//     message type is a DM ? subject: String ,
//     message type is a DM ? body: String
//                    IF NOT content: string,
//     **adds Date automatically Key = "timeSent"
//   }

export const createMessage = (params) => {
  for (let key in params) {
    if (typeof params[key] !== "string") {
      console.error(
        `Message Parameter ${key} expected a string. Recieved ${typeof params[
          key
        ]} instead`
      );
    }
  }
  const msg = { ...params, timeSent: Date.now() };
  return msg;
};

export const deleteProjectAlert = async (projectSlug, messages) => {
  //setting server data from client data is dangerous.
  //Will replace with serverless fn in future

  let alertObj = {};
  for (let msg of messages) {
    if (!msg.isChecked) {
      alertObj[msg.id] = msg;
    }
  }
  return db
    .collection("projects")
    .doc(projectSlug)
    .update({
      alerts: alertObj,
    })
    .then(() => alertObj);
};
export const markAlert = async (projectSlug, messages, messageID) => {
  let alertObj = {};
  for (let msg of messages) {
    if (msg.id === messageID) {
      alertObj[msg.id] = { ...msg, status: "read" };
    } else {
      alertObj[msg.id] = msg;
    }
  }
  console.log(alertObj);
  return db
    .collection("projects")
    .doc(projectSlug)
    .update({
      alerts: alertObj,
    })
    .then(() => alertObj);
};

export const sendDM = async (recipient, sender, subject, body) => {
  const id = uuidv4();

  const message = createMessage({
    id,
    recipient: recipient.displayName,
    sender: sender.displayName,
    subject,
    body,
    status: "unread",
    type: "DM",
  });

  db.collection("profiles")
    .doc(recipient.id)
    .collection("messages")
    .doc("DMs")
    .update({
      [id]: message,
    })
    .then(() => console.log("message sent"));
};
