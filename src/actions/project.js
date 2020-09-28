import { v4 as uuidv4 } from "uuid";
import { db } from "../base";
import kebabCase from "lodash.kebabcase";

import { buildComment } from "./comments";
import { handleNewTags } from "./tags";

const projDb = db.collection("projects");

export const createProject = (stepperData, user, finishedFn) => {
  const params = {
    slug: `${kebabCase(user.profile.displayName)}-${kebabCase(
      stepperData[0].answer
    )}`,
    id: uuidv4(),
    name: stepperData[0].answer,
    timeCreated: Date.now(),
    creator: user.profile.displayName,
    causeTag: stepperData[6].answer[0],
    solutionTag: stepperData[7].answer[0],
    skillTags: stepperData[8].answer,
    description: stepperData[1].answer,
    body: [
      { label: "Brief", text: stepperData[1].answer, id: uuidv4() },
      { label: "Problem", text: stepperData[2].answer, id: uuidv4() },
      { label: "Solution", text: stepperData[3].answer, id: uuidv4() },
      {
        label: "The Minimum Viable Product",
        text: stepperData[5].answer,
        id: uuidv4(),
      },
      {
        label: "Creator's Experience",
        text: stepperData[4].answer,
        id: uuidv4(),
      },
      { label: "Details", text: stepperData[9].answer, id: uuidv4() },
    ],
    commentCount: 0,
    votes: 0,
  };
  const allStrTags = [
    ...params.skillTags.map((tag) => ({ type: "skill", text: tag })),
    { type: "cause", text: params.causeTag },
    { type: "solution", text: params.solutionTag },
  ];

  const batch = db.batch();
  const projRef = projDb.doc(params.slug);
  batch.set(projRef, params);
  batch.set(projRef.collection("comments").doc("all"), {
    main: [
      buildComment(
        "Congrats on creating a CoLab project! This is the comment section where contributors will come to ask questions about your project. Be sure to provide them with prompt and thoughtful answers.",
        {
          id: "does-not-exist",
          displayName: "CodeCause Team",
        }
      ),
    ],
  });
  batch
    .commit()
    // batch.
    // projDb
    //   .doc(params.slug)
    //   .set(params)
    .then(() => {
      handleNewTags(allStrTags);
      finishedFn();
    })
    .catch((err) => {
      console.err(err);
    });
};
export const getProjects = async () => {
  return projDb
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
};
export const getProject = async (projectId) => {
  return projDb
    .doc(projectId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.error("Document does not exist");
      }
    })
    .catch((err) => console.error(err));
};

const getTagField = (tagType) => {
  if (tagType === "skill") return "skillTags";
  if (tagType === "cause") return "causeTag";
  if (tagType === "solution") return "solutionTag";
};
const getTagSearchOp = (tagType) => {
  if (tagType === "skill") return "array-contains";
  else return "==";
};

export const queryProjectsByTag = async (tagType, value) => {
  const op = getTagSearchOp(tagType);
  const field = getTagField(tagType);
  return projDb
    .where(field, op, value)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((err) => console.error(err));
};
export const replaceSections = (
  sections,
  projId,
  setSections,
  setLoading,
  toggleModal
) => {
  setLoading(true);

  projDb
    .doc(projId)
    .update({ body: sections })
    .then(() => {
      setSections(sections);
      setLoading(false);
      toggleModal();
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      toggleModal();
    });
};
