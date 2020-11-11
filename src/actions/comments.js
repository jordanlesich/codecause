import firebase from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { db } from "../base";

const projDb = db.collection("projects");

const formatIncomingComments = (doc) =>
  Object.values(doc).sort((a, b) => (a.sent > b.sent ? 1 : -1));

export const buildComment = (id, text, user, parent) => ({
  text,
  parent,
  from: user.displayName,
  fromID: user.id,
  sent: Date.now(),
  votes: [],
  id,
  replyCount: 0,
});

export const addComment = async (
  projectID,
  thread,
  text,
  user,
  parentThread
) => {
  const id = uuidv4();
  const newComment = buildComment(id, text, user, thread);
  const batch = db.batch();

  //creates a new comment object on an existing thread document if it exists
  //if it doesn't exist, the 'set' method creates a new one
  batch.set(
    projDb.doc(projectID).collection("comments").doc(thread),
    {
      [id]: newComment,
    },
    { merge: true }
  );
  //if comment is not part of the main thread
  //we find the parent comment we are replying to and incrememt the replyCount
  if (thread !== "main") {
    batch.update(
      projDb.doc(projectID).collection("comments").doc(parentThread),
      {
        [`${thread}.replyCount`]: firebase.firestore.FieldValue.increment(1),
      }
    );
  }
  //regardless of thread, we update the overall comment count
  batch.update(projDb.doc(projectID), {
    commentCount: firebase.firestore.FieldValue.increment(1),
  });

  return batch
    .commit()
    .then(() => {
      //then we retieve the thread of comments we have either updated or set
      //and return them to the client to reflect one source of truth
      return projDb
        .doc(projectID)
        .collection("comments")
        .doc(thread)
        .get()
        .then((doc) => {
          return formatIncomingComments(doc.data());
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.error(error));
};

export const getComments = async (commentDir, projectID) => {
  console.log(commentDir, projectID);
  return db
    .collection("projects")
    .doc(projectID)
    .collection("comments")
    .doc(commentDir)
    .get()
    .then((doc) => {
      return formatIncomingComments(doc.data());
    })
    .catch((error) => console.error(error));
};
// export const addComment = (comments, projRef, setComments, toggleLoading) => {
//   const batch = db.batch();
//   toggleLoading();
//   batch.set(projDb.doc(projRef).collection("comments").doc("all"), {
//     main: comments,
//   });
//   batch.update(projDb.doc(projRef), {
//     commentCount: firebase.firestore.FieldValue.increment(1),
//   });
//   batch
//     .commit()
//     .then(() => {
//       setComments(comments);
//     })
//     .catch((err) => {
//       console.error(err);
//       toggleLoading();
//     });
// };
