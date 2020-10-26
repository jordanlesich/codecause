import { db } from "../base";
import firebase from "firebase/app";

const voteDb = db.collection("votes");
const projDb = db.collection("projects");
const profileDb = db.collection("profiles");

const makeVoteId = (profileId, projSlug) => `${profileId}-${projSlug}`;

export const addVote = async (voter, project) => {
  const voteId = makeVoteId(voter.displayName, project.slug);
  const timeVoted = Date.now();
  const batch = db.batch();
  //create a vote receipt in the votes collection
  batch.set(voteDb.doc(voteId), {
    from: voter.displayName,
    project: project.slug,
    timeVoted,
  });
  //adds the voter's id to the project's votes array
  batch.set(
    projDb.doc(project.slug),
    {
      votes: { [voter.displayName]: true },
    },
    { merge: true }
  );
  //sends a message to the project's creator
  batch.set(profileDb.doc(project.creator).collection("messages").doc("all"), {
    main: firebase.firestore.FieldValue.arrayUnion({
      from: "CoLab",
      type: "news",
      msg: `${voter.displayName} added a like to ${project.name}`,
      date: timeVoted,
    }),
  });
  //adds the project slug(id) to the user's 'voted projects' array
  batch.set(
    profileDb.doc(voter.displayName),
    {
      votedProjects: { [project.slug]: true },
    },
    { merge: true }
  );
  return batch
    .commit()
    .then(() => {
      return "Vote added!";
    })
    .catch((err) => {
      return err;
    });
};

export const removeVote = async (voter, project) => {
  const voteId = makeVoteId(voter.displayName, project.slug);
  const batch = db.batch();

  //remove the vote receipt from the votes collection
  batch.delete(voteDb.doc(voteId));
  //remove the voter's id to the project's votes array
  batch.update(
    projDb.doc(project.slug),
    { [`votes.${voter.displayName}`]: firebase.firestore.FieldValue.delete() }
    // { merge: true }
  );
  //removes the project slug(id) to the user's 'voted projects' array
  batch.update(profileDb.doc(voter.displayName), {
    [`votedProjects.${project.slug}`]: firebase.firestore.FieldValue.delete(),
  });
  return batch
    .commit()
    .then(() => {
      return "Removed Vote!";
    })
    .catch((err) => {
      return err;
    });
};
