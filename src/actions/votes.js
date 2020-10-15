import { db } from "../base";
import firebase from "firebase/app";

const voteDb = db.collection("votes");
const projDb = db.collection("projects");
const profileDb = db.collection("profiles");

const makeVoteId = (profileId, projSlug) => `${profileId}-${projSlug}`;

export const addVote = async (voter, project, setVoteState, setLoading) => {
  setLoading(true);
  const voteId = makeVoteId(voter.displayName, project.slug);
  const batch = db.batch();
  //create a vote receipt in the votes collection
  batch.set(voteDb.doc(voteId), {
    from: voter.displayName,
    project: project.slug,
    timeVoted: Date.now(),
  });
  //adds the voter's id to the project's votes array
  batch.update(projDb.doc(project.slug), {
    votes: firebase.firestore.FieldValue.arrayUnion(voter.displayName),
  });
  //sends a message to the project's creator
  batch.set(profileDb.doc(project.creator).collection("messages").doc("all"), {
    main: firebase.firestore.FieldValue.arrayUnion({
      from: "CoLab",
      type: "news",
      msg: `${voter.displayName} added a like to ${project.name}`,
      date: Date.now(),
    }),
  });
  //adds the project slug(id) to the user's 'voted projects' array
  batch.update(profileDb.doc(voter.displayName), {
    votedProjects: firebase.firestore.FieldValue.arrayUnion(project.slug),
  });
  return batch
    .commit()
    .then(() => {
      setVoteState((prevState) => ({
        votes: [voter.displayName, ...prevState.votes],
        hasVoted: true,
      }));
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};

export const removeVote = async (voter, project, setVoteState, setLoading) => {
  setLoading(true);
  const voteId = makeVoteId(voter.displayName, project.slug);
  const batch = db.batch();

  //remove the vote receipt from the votes collection
  batch.delete(voteDb.doc(voteId));
  //remove the voter's id to the project's votes array
  batch.update(projDb.doc(project.slug), {
    votes: firebase.firestore.FieldValue.arrayRemove(voter.displayName),
  });
  //removes the project slug(id) to the user's 'voted projects' array
  batch.update(profileDb.doc(voter.displayName), {
    votedProjects: firebase.firestore.FieldValue.arrayRemove(project.slug),
  });
  return batch
    .commit()
    .then(() => {
      setVoteState((prevState) => {
        return {
          votes: prevState.votes.filter((votes) => votes !== voter.displayName),
          hasVoted: false,
        };
      });
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};
