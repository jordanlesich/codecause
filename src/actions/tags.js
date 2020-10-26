import { db } from "../base";
import firebase from "firebase/app";

export const formatIncomingTags = (obj, type) =>
  Object.keys(obj).map((key) => ({
    name: key,
    type,
  }));

const formatTagsForSearch = (tags, type) => {
  let newArr = [];
  for (let tag in tags) {
    newArr = [
      ...newArr,
      { name: tag, projects: tags[tag].projects, type, selected: false },
    ];
  }
  return newArr;
};

const formatTagsForPicker = (tags) => {
  let newArr = [];
  for (let tag in tags) {
    newArr = [...newArr, { name: tag, projects: tags[tag].projects.length }];
  }

  return newArr;
};

//passes in array of strings and outputs a 'mapping' usable for Firebase queries
export const formatOutgoingTags = (tags, destination, projSlug) => {
  let newObj = {};
  if (destination === "projectDB") {
    tags.forEach((tag) => {
      newObj[tag] = true;
    });
  } else if (destination === "tagDB") {
    tags.forEach((tag) => {
      newObj[tag] = {
        projects: firebase.firestore.FieldValue.arrayUnion(projSlug),
      };
    });
  } else {
    console.error(
      "Did not recieve the correct destination value while formatting outgoing tags"
    );
  }
  console.log(newObj);
  return newObj;
};

export const getTags = async (type, format) => {
  if (!type) throw new Error("tag type was falsy, likely undefined");
  return db
    .collection("tags")
    .doc(`${type}Tags`)
    .get()
    .then((doc) => {
      if (format === "tagSearch") {
        return formatTagsForSearch(doc.data(), type);
      } else if (format === "tagPicker") {
        return formatTagsForPicker(doc.data(), type);
      } else {
        throw new Error("getTags did not recieve a proper format argument");
      }
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

// export const getTags = async () => {
//   const doc = await db.collection("tags").doc("allTags").get();
//   if (doc.exists) {
//     return doc.data();
//   } else {
//     console.error(`error: response returned ${doc}`);
//   }
// };
const saveNewTags = async (tagObj) => {
  const response = await db.collection("tags").doc("allTags").set(tagObj);
  return response;
};

export const handleNewTags = async (newTags) => {
  let collection = await getTags();
  for (let tag of newTags) {
    if (!collection[tag.type]) return console.error("tag type does not exist");
    if (collection[tag.type][tag.text]) {
      collection[tag.type][tag.text]++;
    } else if (!collection[tag.type][tag.text]) {
      collection[tag.type][tag.text] = 1;
    } else {
      console.error("tag add errored out: " + tag.type + " " + tag.text);
    }
  }
  return saveNewTags(collection);
};

// export const testTags = () => {
//   handleNewTags(sampleTags);
// };

export const testAddTag = async (str, slug = "lil-bitch-test") => {
  const batch = db.batch();

  batch.set(
    db.collection("tags").doc("causeTags"),
    formatOutgoingTags(["cause"], "tagDB", slug),
    { merge: true }
  );
  batch.set(
    db.collection("tags").doc("solutionTags"),
    formatOutgoingTags(["daddy"], "tagDB", slug),
    { merge: true }
  );
  batch.set(
    db.collection("tags").doc("skillTags"),
    formatOutgoingTags(["a", "b", "c", "d", "e"], "tagDB", slug),
    { merge: true }
  );

  return batch
    .commit()
    .then(() => true)
    .catch((err) => console.error(err));
};
