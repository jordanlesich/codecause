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
  const profileAlreadyExists = await checkProfileExists(displayName);

  if (profileAlreadyExists) {
    return { type: "error", error: "Error: Username already exists" };
  } else {
    const batch = db.batch();
    const profileRef = db.collection("profiles").doc(kebabCase(displayName));
    const profileData = {
      displayName,
      email,
      timeJoined: Date.now(),
      votedProjects: {},
      projectsCreated: [],
      projectsContributing: [],
    };
    batch.set(profileRef, profileData);
    batch.set(profileRef.collection("messages").doc("all"), {
      main: [
        {
          from: "Jordan",
          to: displayName,
          msg:
            "Welcome to CoLab, I will make a better welcome message later on!",
          timeSent: Date.now(),
        },
      ],
    });
    return batch
      .commit()
      .then((res) => {
        return { type: "success", data: profileData };
      })
      .catch((err) => {
        return { type: "error", error: err.toString() };
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
