import { db } from "../base";
import { v4 as uuidv4 } from "uuid";
import kebabCase from "lodash.kebabcase";

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

const markRead = (messageArr, id) => {
  return messageArr.reduce((acc, msg) => {
    return msg.id === id
      ? { ...acc, [msg.id]: { ...msg, status: "read" } }
      : { ...acc, [msg.id]: msg };
  }, {});
};
export const markProjectAlert = async (projectSlug, messages, messageID) => {
  const alertObj = markRead(messages, messageID);
  return db
    .collection("projects")
    .doc(projectSlug)
    .update({
      alerts: alertObj,
    })
    .then(() => alertObj);
};
export const markUserAlert = async (userID, messages, messageID) => {
  const alertObj = markRead(messages, messageID);
  return db
    .collection("profiles")
    .doc(userID)
    .collection("messages")
    .doc("alerts")
    .set(alertObj)
    .then(() => alertObj);
};

export const markDM = async (userID, messages, messageID) => {
  let dmObj = markRead(messages, messageID);
  return db
    .collection("profiles")
    .doc(userID)
    .collection("messages")
    .doc("DMs")
    .update(dmObj)
    .then(() => dmObj);
};
//deletes CheckedObj and converts to Object
const deleteChecked = (messageArr) => {
  return messageArr.reduce((acc, msg) => {
    return msg.isChecked ? acc : { ...acc, [msg.id]: msg };
  }, {});
};
export const deleteProjectAlert = async (projectSlug, messages) => {
  const alertObj = deleteChecked(messages);
  return db
    .collection("projects")
    .doc(projectSlug)
    .update({
      alerts: alertObj,
    })
    .then(() => alertObj);
};
export const deleteUserAlert = async (userID, messages) => {
  const alertObj = deleteChecked(messages);
  return db
    .collection("profiles")
    .doc(userID)
    .collection("messages")
    .doc("alerts")
    .set(alertObj)
    .then(() => alertObj);
};
export const deleteDM = async (userID, messages) => {
  const dmObj = deleteChecked(messages);
  return db
    .collection("profiles")
    .doc(userID)
    .collection("messages")
    .doc("DMs")
    .set(dmObj)
    .then(() => dmObj);
};

export const getDMs = async (userSlug) => {
  return db
    .collection("profiles")
    .doc(userSlug)
    .collection("messages")
    .doc("DMs")
    .get()
    .then((doc) => doc.data());
};
export const getUserAlerts = async (userSlug) => {
  return db
    .collection("profiles")
    .doc(userSlug)
    .collection("messages")
    .doc("alerts")
    .get()
    .then((doc) => doc.data());
};

export const sendDM = async (recipientDname, sender, subject, body) => {
  const id = uuidv4();
  const message = createMessage({
    id,
    recipient: recipientDname,
    sender: sender.displayName,
    subject,
    body,
    status: "unread",
    type: "DM",
  });

  db.collection("profiles")
    .doc(kebabCase(recipientDname))
    .collection("messages")
    .doc("DMs")
    .update({
      [id]: message,
    })
    .then(() => console.log("message sent"));
};
