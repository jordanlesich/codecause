import { db } from "../base";
import kebabCase from "lodash.kebabcase";

export const checkProfileExists = async (displayName) => {
  return db
    .collection("profiles")
    .doc(kebabCase(displayName))
    .get()
    .then((document) => document.exists)
    .catch((err) => ({ type: "error", error: err.toString() }));
  //above would usually throw in case of a permissions error. Needs to be fixed in security settings
};

export const addProfile = async (displayName, email) => {
  if (displayName == null || email == null)
    throw new Error("One of the fields were empty.");

  const profileAlreadyExists = await checkProfileExists(displayName);
  if (profileAlreadyExists)
    throw new Error("Profile already exists. Please pick a unique username.");

  const id = kebabCase(displayName);
  const batch = db.batch();
  const profileRef = db.collection("profiles").doc(id);
  const profileData = {
    displayName,
    id,
    email,
    timeJoined: Date.now(),
    votedProjects: {},
    projectsCreated: [],
    projectsContributing: [],
  };
  batch.set(profileRef, profileData);
  batch.set(profileRef.collection("messages").doc("alerts"), {});
  batch.set(profileRef.collection("messages").doc("DMs"), {});
  return batch
    .commit()
    .then(() => {
      return { success: profileData };
    })
    .catch((err) => {
      return err;
    });
};

export const getProfile = async (id) => {
  return db
    .collection("profiles")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error(`user ${id} does not have a profile in the db`);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const getProfileByEmail = async (email) => {
  return db
    .collection("profiles")
    .where("email", "==", email)
    .get()
    .then((querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => doc.data());
      if (result.length === 1) {
        return result[0];
      } else if (result.length > 1) {
        throw new Error("Duplicate Profiles");
      } else {
        throw new Error(
          "No profile returned, or profile data has been corrupted"
        );
      }
    })
    .catch((error) => {
      return error;
    });
};

export const deleteProfile = async (displayName) => {
  return db
    .collection("profiles")
    .doc(kebabCase(displayName))
    .delete()
    .then(() => console.log("Delete profile successful"))
    .catch((err) => console.error(`Doc doesn't exist. Error: ${err}`));
};
