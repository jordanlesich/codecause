import { v4 as uuidv4 } from "uuid";
import { db } from "../base";
import { handleNewTags } from "./tags";

const projectRef = db.collection("projects");

export const createProject = (stepperData, user, finishedFn, loadingFn) => {
  const params = {
    id: uuidv4(),
    name: stepperData[0].answer,
    description: stepperData[1].answer,
    creator: user.displayName,
    timeCreated: Date.now(),
    problem: stepperData[2].answer,
    solution: stepperData[3].answer,
    experience: stepperData[4].answer,
    mvp: stepperData[5].answer,
    causeTag: stepperData[6].answer,
    solutionTag: stepperData[7].answer,
    skillTags: stepperData[8].answer.split(" "),
    details: stepperData[9].answer,
  };

  projectRef
    .doc(params.id)
    .set(params)
    .then(() => {
      console.log(`${params.name} posted successfully`);
      const newSkillTags = params.skillTags.map((tag) => ({
        type: "skill",
        text: tag,
      }));
      handleNewTags([
        { type: "solution", text: params.solutionTag },
        { type: "cause", text: params.causeTag },
        ...newSkillTags,
      ]);
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
  console.log(field, op, value);
  return projectRef
    .where(field, op, value)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((err) => console.error(err));
};
