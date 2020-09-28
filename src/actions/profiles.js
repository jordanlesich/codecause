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

export const addProfile = async ({ displayName, email }) => {
  const profileExists = await checkProfileExists(displayName);
  if (profileExists) {
    return { type: "error", error: "Error: Username already exists" };
  } else {
    return db
      .collection("profiles")
      .doc(kebabCase(displayName))
      .set({
        displayName,
        email,
        timeJoined: Date.now(),
        starredProjects: [],
        projectsCreated: [],
        projectsContributing: [],
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  }
};

export const getProfile = async (displayName) => {
  return db
    .collection("profiles")
    .doc(displayName)
    .get()
    .then((doc) => doc.data())
    .catch((err) => console.error(`Doc doesn't exist. Error: ${err}`));
};

export const getProfileByEmail = async (email) => {
  console.log(email);
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
      }
    })
    .catch((err) => {
      console.error(`Doc doesn't exist. Error: ${err}`);
      return err;
    });
};

export const deleteProfile = async (displayName) => {
  return db
    .collection("profiles")
    .doc(displayName)
    .delete()
    .then(() => console.log("Delete profile successful"))
    .catch((err) => console.error(`Doc doesn't exist. Error: ${err}`));
};
