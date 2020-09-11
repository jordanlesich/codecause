import { v4 as uuidv4 } from "uuid";
import { db } from "../base";
import kebabCase from "lodash.kebabcase";

import { handleNewTags } from "./tags";

const projectRef = db.collection("projects");

export const createProject = (stepperData, user, finishedFn) => {
  const params = {
    slug: `${kebabCase(user.profile.displayName)}-${kebabCase(
      stepperData[0].answer
    )}`,
    id: uuidv4(),
    name: stepperData[0].answer,
    description: stepperData[1].answer,
    creator: user.profile.displayName,
    timeCreated: Date.now(),
    problem: stepperData[2].answer,
    solution: stepperData[3].answer,
    experience: stepperData[4].answer,
    mvp: stepperData[5].answer,
    causeTag: stepperData[6].answer[0],
    solutionTag: stepperData[7].answer[0],
    skillTags: stepperData[8].answer,
    details: stepperData[9].answer,
    votes: 0,
  };

  projectRef
    .doc(params.slug)
    .set(params)
    .then(() => {
      const allStrTags = [
        ...params.skillTags.map((tag) => ({ type: "skill", text: tag })),
        { type: "cause", text: params.causeTag },
        { type: "solution", text: params.solutionTag },
      ];
      handleNewTags(allStrTags);
      finishedFn();
    })
    .catch((err) => {
      console.err(err);
    });
};
export const getProjects = async () => {
  return projectRef
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
};
export const getProject = async (projectId) => {
  return projectRef
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
  return projectRef
    .where(field, op, value)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((err) => console.error(err));
};
