import { db } from "../base";

const sampleTags = [
  { type: "cause", text: "sample-causes-everywhere" },
  { type: "solution", text: "sample-app" },
  { type: "skill", text: "sampleJS" },
  { type: "skill", text: "sampleJS" },
  { type: "skill", text: "sampleJS" },
  { type: "skill", text: "samplebase" },
  { type: "skill", text: "samplestore" },
  { type: "skill", text: "sample-developer" },
  { type: "skill", text: "sample-designer" },
];

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

export const formatOutgoingTags = (tags) => {
  let newObj = {};
  tags.forEach((tag) => {
    newObj[tag] = true;
  });
  return newObj;
};

export const getTags = async (type) => {
  return db
    .collection("tags")
    .doc(`${type}Tags`)
    .get()
    .then((doc) => {
      return formatTagsForSearch(doc.data(), type);
    })
    .catch((err) => {
      return {
        error: `Could not find tags with the givem query paramter: "${type}"`,
        details: err,
      };
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

export const testTags = () => {
  handleNewTags(sampleTags);
};
