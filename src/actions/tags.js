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

export const getTags = async () => {
  const doc = await db.collection("tags").doc("allTags").get();
  if (doc.exists) {
    return doc.data();
  } else {
    console.error(`error: response returned ${doc}`);
  }
};
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
