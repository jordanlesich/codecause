import { v4 as uuidv4 } from "uuid";
import { db } from "../base";
import kebabCase from "lodash.kebabcase";

import { buildComment } from "./comments";
import { handleNewTags, formatIncomingTags, formatOutgoingTags } from "./tags";

const projDb = db.collection("projects");

//***********************HELPERS****************** */

const formatIncomingProject = (project) => {
  return {
    ...project,
    skillTags: formatIncomingTags(project.skillTags, "skill"),
    causeTags: formatIncomingTags(project.causeTags, "cause"),
    solutionTags: formatIncomingTags(project.solutionTags, "solution"),
  };
};
const getProjectSlug = (displayName, projectName) => {
  if (!displayName || !projectName)
    throw new Error(
      "Did not recieve the required argument to create a project slug"
    );
  else {
    return `${kebabCase(displayName)}-${kebabCase(projectName)}`;
  }
};
export const isSlugUnique = async (displayName, projectName) => {
  return projDb
    .doc(getProjectSlug(displayName, projectName))
    .get()
    .then((doc) => {
      if (doc.exists) {
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => console.error(error));
};
const createProjectParams = (stepperData, displayName, slug) => {
  return {
    slug,
    id: uuidv4(),
    timeCreated: Date.now(),
    creator: displayName,
    name: stepperData[0].answer,
    causeTags: formatOutgoingTags(stepperData[6].answer, "projectDB"),
    solutionTags: formatOutgoingTags(stepperData[7].answer, "projectDB"),
    skillTags: formatOutgoingTags(stepperData[8].answer, "projectDB"),
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
    contributors: [],
    votes: [],
    awards: [],
  };
};

//*******************REQUESTS*********************/

export const createProject = async (stepperData, displayName) => {
  if (!stepperData || !displayName)
    throw new Error("Create Project received falsy arguments");
  if (!Array.isArray(stepperData) || !typeof displayName === "string")
    throw new Error(
      "Create Project did not receive arguments of the correct type"
    );
  const isUnique = await isSlugUnique(displayName, stepperData[0].answer);
  if (!isUnique) throw new Error("Project id is not unique");
  if (!stepperData.every((step) => step.completed)) {
    throw new Error(
      "Project was submitted for creation with incomplete stepper data"
    );
  }

  const slug = getProjectSlug(displayName, stepperData[0].answer);
  const projectParams = createProjectParams(stepperData, displayName, slug);
  const outgoingCause = formatOutgoingTags(
    stepperData[6].answer,
    "tagDB",
    slug
  );
  const outgoingSolution = formatOutgoingTags(
    stepperData[7].answer,
    "tagDB",
    slug
  );
  const outgoingSkill = formatOutgoingTags(
    stepperData[8].answer,
    "tagDB",
    slug
  );
  const starterComment = buildComment(
    "Congrats on creating a CoLab project! This is the comment section where contributors will come to ask questions about your project. Be sure to provide them with prompt and thoughtful answers.",
    "Jordan"
  );

  const batch = db.batch();

  batch.set(projDb.doc(slug), projectParams);
  batch.set(projDb.doc(slug).collection("comments").doc("main"), {
    all: [starterComment],
  });
  batch.set(projDb.doc(slug).collection("applications").doc("main"), {
    all: [],
  });
  batch.set(db.collection("tags").doc("causeTags"), outgoingCause, {
    merge: true,
  });
  batch.set(db.collection("tags").doc("solutionTags"), outgoingSolution, {
    merge: true,
  });
  batch.set(db.collection("tags").doc("skillTags"), outgoingSkill, {
    merge: true,
  });

  return batch
    .commit()
    .then(() => {
      console.log("Project Created!");
      return `/project/${slug}`;
    })
    .catch((err) => {
      return err;
    });
};

export const getProjects = async () => {
  return projDb
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => formatIncomingProject(doc.data()))
    );
};

export const getProject = async (slug) => {
  return projDb
    .doc(slug)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return formatIncomingProject(doc.data());
      } else {
        console.error("Document does not exist");
      }
    })
    .catch((err) => console.error(err));
};

export const queryProjectsByName = async (name) => {
  return projDb
    .where("name", "==", name)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => formatIncomingProject(doc.data()));
    })
    .catch((err) => console.error(err));
};

export const queryProjectsByTag = async (tagType, value) => {
  const op = getTagSearchOp(tagType);
  const field = getTagField(tagType);
  return projDb
    .where(field, op, value)
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => formatIncomingProject(doc.data()))
    )
    .catch((err) => console.error(err));
};

export const queryProjectsByTags = async (allTags) => {
  let queryRef = projDb;
  allTags.forEach((tag) => {
    queryRef = queryRef.where(`${tag.type}Tags.${tag.name}`, "==", true);
  });
  return await queryRef
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => formatIncomingProject(doc.data()))
    )
    .catch((err) => console.error(err));
};

const getTagField = (tagType) => {
  if (tagType === "skill") return "skillTags";
  if (tagType === "cause") return "causeTags";
  if (tagType === "solution") return "solutionTags";
};
const getTagSearchOp = (tagType) => {
  if (tagType === "skill") return "array-contains";
  else return "==";
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
