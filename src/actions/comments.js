import firebase from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { db } from "../base";

const projDb = db.collection("projects");

export const buildComment = (text, from) => ({
  id: uuidv4(),
  text,
  from,
  sent: Date.now(),
  replies: [],
});

export const getComments = (projRef, setComments) => {
  setComments("loading");
  projDb
    .doc(projRef)
    .collection("comments")
    .doc("all")
    .get()
    .then((doc) => {
      setComments(doc.data().main);
    })
    .catch((err) => console.error(err));
};
export const addComment = (comments, projRef, setComments, toggleLoading) => {
  const batch = db.batch();

  toggleLoading();
  batch.set(projDb.doc(projRef).collection("comments").doc("all"), {
    main: comments,
  });
  batch.update(projDb.doc(projRef), {
    commentCount: firebase.firestore.FieldValue.increment(1),
  });
  batch
    .commit()
    .then(() => {
      setComments(comments);
    })
    .catch((err) => {
      console.error(err);
      toggleLoading();
    });
};
