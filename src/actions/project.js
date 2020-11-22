import firebase from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { db } from "../base";
import kebabCase from "lodash.kebabcase";

import { createMessage } from "../actions/messages";
import { formatIncomingTags, formatOutgoingTags } from "./tags";

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
const getProjectSlug = (userID, projectName) => {
  if (!userID || !projectName)
    throw new Error(
      "Did not recieve the required argument to create a project slug"
    );
  else {
    return `${kebabCase(userID)}-${kebabCase(projectName)}`;
  }
};
export const isSlugUnique = async (userID, projectName) => {
  return projDb
    .doc(getProjectSlug(userID, projectName))
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
    awards: [],
    votes: {},
  };
};

//*******************REQUESTS*********************/

export const createProject = async (stepperData, user) => {
  if (!stepperData || !user)
    throw new Error("Create Project received falsy arguments");
  if (!Array.isArray(stepperData) || !typeof user.id === "string")
    throw new Error(
      "Create Project did not receive arguments of the correct type"
    );
  const isUnique = await isSlugUnique(user.id, stepperData[0].answer);
  if (!isUnique) throw new Error("Project id is not unique");
  if (!stepperData.every((step) => step.completed)) {
    throw new Error(
      "Project was submitted for creation with incomplete stepper data"
    );
  }

  const slug = getProjectSlug(user.id, stepperData[0].answer);
  const projectParams = createProjectParams(
    stepperData,
    user.displayName,
    slug
  );
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

  const projectDataForCreator = {
    name: projectParams.name,
    slug,
    id: projectParams.id,
    description: projectParams.description,
    role: "Creator",
    timeCreated: projectParams.timeCreated,
  };

  const batch = db.batch();

  batch.set(projDb.doc(slug), projectParams);
  batch.set(projDb.doc(slug).collection("comments").doc("main"), {});
  batch.set(projDb.doc(slug).collection("applications").doc("main"), {});
  batch.set(
    db.collection("profiles").doc(user.id),
    {
      projectsCreated: firebase.firestore.FieldValue.arrayUnion(
        projectDataForCreator
      ),
    },
    { merge: true }
  );
  batch.set(
    db.collection("profiles").doc(user.id).collection("private").doc("keys"),
    {
      [projectParams.id]: "creator",
    },
    { merge: true }
  );
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

export const queryProjectsByTag = async ({ field, value }) => {
  console.log(field, value);
  return projDb
    .where(`${field}Tags.${value}`, "==", true)
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

export const querySingleProjectByX = async (field, value) => {
  return db
    .collection("projects")
    .where(field, "==", value)
    .get()
    .then((querySnapshot) => {
      const matches = querySnapshot.docs;
      if (matches.length < 0) {
        throw new Error("No matches found for this project ID");
      } else if (matches.length > 1) {
        throw new Error("Found more than one project with the same ID");
      } else {
        return formatIncomingProject(matches[0].data());
      }
    })
    .catch((error) => error);
};

export const removeAlertByType = async (alertType, project) => {
  //changing db data with client side data is bad practice
  //This is temporary until I work in serverless functions
  const { alerts } = project;
  let newAlerts = {};
  for (let alert in alerts) {
    if (alerts[alert].type !== alertType) {
      newAlerts[alert] = alerts[alert];
    }
  }
  try {
    await db
      .collection("projects")
      .doc(project.slug)
      .set({ alerts: newAlerts }, { merge: true });
    const newProject = await getProject(project.slug);
    return newProject;
  } catch (error) {
    throw new Error();
  }
};

export const addSampleAlert = async (projectSlug) => {
  const id = uuidv4();

  const fakeMessage = createMessage({
    id,
    recipient: projectSlug,
    sender: "CoLab",
    content: `This is a long message where I'll tell you to get fucked. So yeah...fuck off`,
    status: "unread",
    type: "newApplication",
  });

  return db
    .collection("projects")
    .doc(projectSlug)
    .set(
      {
        alerts: { [id]: fakeMessage },
      },
      { merge: true }
    );
};
