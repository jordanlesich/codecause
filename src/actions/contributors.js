import { db } from "../base";
import { v4 as uuidv4 } from "uuid";
import { createMessage } from "./messages";

export const removeContributor = async (userID, projectSlug) => {
  //I made the mistake of trusting arrays as a datatype with Firestore
  //which is always a mistake unless we are storing just strings.
  //Now I have to query the project and the user (just to be safe),
  //this is less than optimal and will be fixed Serverless Fns
  try {
    //retrieve the project and contributor in question
    const projectPromise = await db
      .collection("projects")
      .doc(projectSlug)
      .get();
    const profilePromise = await db.collection("profiles").doc(userID).get();

    //extract the data
    const project = projectPromise.data();
    const profile = profilePromise.data();

    //filter out the contributor and save as constant for return to UI
    const newContributors = project.contributors.filter(
      (user) => user.id !== userID
    );

    const batch = db.batch();

    const creatorMsgID = uuidv4();
    const contributorMsgID = uuidv4();

    //update the arrays containing the contributor and the project in the
    //respective documents
    batch.update(db.collection("projects").doc(projectSlug), {
      contributors: newContributors,
    });
    batch.update(db.collection("profiles").doc(userID), {
      projectsContributing: profile.projectsContributing.filter(
        (proj) => proj.slug !== projectSlug
      ),
    });
    // send the project and the now ex-contributor alerts
    batch.set(
      db.collection("projects").doc(projectSlug),
      {
        alerts: {
          [creatorMsgID]: createMessage({
            id: creatorMsgID,
            recipeint: project.creator,
            sender: "CoLab",
            content: `You have removed ${profile.displayName} from ${project.name}`,
            status: "unread",
            type: "removal-contributor",
          }),
        },
      },
      { merge: true }
    );
    batch.set(
      db
        .collection("profiles")
        .doc(userID)
        .collection("messages")
        .doc("alerts"),
      {
        [contributorMsgID]: createMessage({
          id: contributorMsgID,
          recipient: profile.displayName,
          sender: "CoLab",
          content: `Unfortunately, you have been removed from ${project.name}`,
          status: "unread",
          type: "removal-contributor",
        }),
      },
      { merge: true }
    );
    //commit and return the newContributors so that we can update the UI
    await batch.commit();
    return newContributors;
  } catch (error) {
    return error;
  }
};
