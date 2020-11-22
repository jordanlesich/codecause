import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import { createMessage } from "../actions/messages";
import { db } from "../base";

const getProjectInfo = async (id) => {
  return db
    .collection("projects")
    .doc(id)
    .get()
    .then((doc) => doc.data())
    .catch((err) => console.error(err));
};

const checkIsInvolved = (user, project) => {
  if (user.displayName === project.creator) return true;
  for (let contributor of project.contributors) {
    if (contributor.id === user.id) {
      return true;
    }
  }
  return false;
};

export const sendApplication = async (projectID, { data, user }) => {
  const project = await getProjectInfo(projectID);
  if (!project) {
    throw new Error(`Project ${projectID} does not exist in the DB`);
  }
  if (checkIsInvolved(user, project)) {
    throw new Error(
      "Contributors or Creators cannot apply to a project they are already involved with. "
    );
  }

  const time = Date.now();
  const id = uuidv4();
  const application = {
    displayName: user.displayName,
    userID: user.id,
    id,
    timeSent: time,
    status: "open",
    body: [
      { label: "Motive", text: data[0].answer },
      { label: "Relevant Skills", text: data[1].answer },
      { label: "Location", text: data[2].answer },
      { label: "Solution", text: data[3].answer },
      { label: "Pledged Hours Per Week", text: data[4].answer },
      { label: "Details", text: data[5].answer },
    ],
  };
  const projectAlert = createMessage({
    id,
    recipient: project.creator,
    sender: user.displayName,
    content: `${user.displayName} has filled out an application for project: ${project.name}.`,
    status: "unread",
    type: "newApplication",
  });

  const batch = db.batch();

  //send application document to project's application subcollection
  batch.set(
    db.collection("projects").doc(projectID).collection("applications").doc(id),
    application,
    { merge: true }
  );
  //send alert object to project's alerts field
  //increase counts
  batch.set(
    db.collection("projects").doc(projectID),
    {
      alerts: { [id]: projectAlert },
      applicationRefs: {
        open: firebase.firestore.FieldValue.arrayUnion(id),
      },
    },
    { merge: true }
  );

  return batch
    .commit()
    .then(() => {
      return "success";
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

export const getApplications = async (projectID) => {
  return db
    .collection("projects")
    .doc(projectID)
    .collection("applications")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    });
};
export const queryApplications = async (docType, projectID) => {
  return db
    .collection("projects")
    .doc(projectID)
    .collection("applications")
    .where("status", "==", docType)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    });
};

export const acceptApplication = async (
  project,
  applicantData,
  applicationID
) => {
  const batch = db.batch();
  const time = Date.now();
  const id = uuidv4();

  const contributorDataForProject = {
    ...applicantData, //name and id
    timeJoined: time,
    permissions: "none",
  };

  const projectDataForContributor = {
    name: project.name,
    slug: project.slug,
    id: project.id,
    description: project.description,
    timeJoined: time,
    permissions: "none",
  };

  const acceptedApplicationAlert = createMessage({
    id,
    recipient: applicantData.id,
    sender: "CoLab",
    content: `Your application for ${project.name} has been accepted`,
    status: "unread",
    type: "applicationAccepted",
  });

  //adds contributor (applicant) data to the project
  batch.set(
    db.collection("projects").doc(project.slug),
    {
      contributors: firebase.firestore.FieldValue.arrayUnion(
        contributorDataForProject
      ),
      applicationRefs: {
        open: firebase.firestore.FieldValue.arrayRemove(applicationID),
        accepted: firebase.firestore.FieldValue.arrayUnion(applicationID),
      },
    },
    { merge: true }
  );
  //adds the project data to the contributor's profile
  batch.set(
    db.collection("profiles").doc(applicantData.id),
    {
      projectsContributing: firebase.firestore.FieldValue.arrayUnion(
        projectDataForContributor
      ),
    },
    { merge: true }
  );
  //adds an alert to the contributor's alert inbox
  batch.set(
    db
      .collection("profiles")
      .doc(applicantData.id)
      .collection("messages")
      .doc("alerts"),
    {
      [id]: acceptedApplicationAlert,
    },
    { merge: true }
  );
  //closes the application object
  batch.set(
    db
      .collection("projects")
      .doc(project.slug)
      .collection("applications")
      .doc(applicationID),
    { status: "accepted" },
    { merge: true }
  );
  batch
    .commit()
    .then(() => {
      return "Success";
    })
    .catch((error) => {
      return error;
    });
};
export const declineApplication = async (
  project,
  applicantData,
  applicationID
) => {
  const id = uuidv4();
  const declinedApplicationAlert = createMessage({
    id,
    content: `Unfortunately your application for ${project.name} has been rejected`,
    status: "unread",
    type: "applicationRejected",
    sender: "CoLab",
    recipient: applicantData.displayName,
  });

  const batch = db.batch();

  batch.set(
    db.collection("projects").doc(project.slug),
    {
      applicationRefs: {
        open: firebase.firestore.FieldValue.arrayRemove(applicationID),
        declined: firebase.firestore.FieldValue.arrayUnion(applicationID),
      },
    },
    { merge: true }
  );

  batch.set(
    db
      .collection("projects")
      .doc(project.slug)
      .collection("applications")
      .doc(applicationID),
    { status: "declined" },
    { merge: true }
  );
  batch.set(
    db
      .collection("profiles")
      .doc(applicantData.id)
      .collection("messages")
      .doc("alerts"),
    {
      [id]: declinedApplicationAlert,
    },
    { merge: true }
  );
  batch
    .commit()
    .then(() => {
      return "Success";
    })
    .catch((error) => {
      return error;
    });
};
