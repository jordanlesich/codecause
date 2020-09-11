import { db } from "../base";
import firebase from "firebase";

const voteDb = db.collection("votes");
const projDb = db.collection("projects");
const profileDb = db.collection("profiles");
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const makeVoteId = (profileId, projSlug) => `${profileId}-${projSlug}`;

export const addVote = async (profile, projSlug, setVoteState, setLoading) => {
  setLoading(true);
  const profileId = profile.id;
  const voteId = makeVoteId(profileId, projSlug);
  const batch = db.batch();
  const voteRef = voteDb.doc(voteId);
  const projRef = projDb.doc(projSlug);
  const profileRef = profileDb.doc(profileId);

  batch.set(voteRef, {
    from: profileId,
    project: projSlug,
    timeVoted: Date.now(),
  });
  batch.update(projRef, { votes: increment });
  batch.update(profileRef, {
    starredProjects: firebase.firestore.FieldValue.arrayUnion(projSlug),
  });
  batch
    .commit()
    .then(() => {
      setVoteState((prevState) => ({
        votes: prevState.votes + 1,
        hasVoted: true,
      }));
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};

export const removeVote = async (
  profile,
  projSlug,
  setVoteState,
  setLoading
) => {
  setLoading(true);
  const profileId = profile.id;
  const voteId = makeVoteId(profileId, projSlug);
  const batch = db.batch();
  const voteRef = voteDb.doc(voteId);
  const projRef = projDb.doc(projSlug);
  const profileRef = profileDb.doc(profileId);

  batch.delete(voteRef);
  batch.update(projRef, { votes: decrement });
  batch.update(profileRef, {
    starredProjects: firebase.firestore.FieldValue.arrayRemove(projSlug),
  });
  batch
    .commit()
    .then(() => {
      setVoteState((prevState) => ({
        votes: prevState.votes - 1,
        hasVoted: false,
      }));
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};
