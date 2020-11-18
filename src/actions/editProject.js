import { v4 as uuidv4 } from "uuid";
import { db } from "../base";

const pureSpliceInsert = (arr, index, item) => {
  const arrayCopy = [...arr];
  arrayCopy.splice(index - 1, 0, item);
  return arrayCopy;
};

const addSection = (sections, params) => {
  const { index, text, label } = params;
  return pureSpliceInsert(sections, index, { text, label, id: uuidv4() });
};

const deleteSection = (sections, params) => {
  return sections.filter((section) => section.id !== params.id);
};

const editSection = (sections, params) => {
  return sections.map((section) => {
    if (section.id === params.id) {
      return { ...params };
    } else {
      return section;
    }
  });
};

const moveSection = (sections, params) => {
  //params {index, selectedSection:{id, label, text}}
  const { index, selectedSection } = params;
  const arr = sections.filter((section) => section.id !== selectedSection.id);
  return pureSpliceInsert(arr, index, selectedSection);
};

const getNewSections = (op, sections, params) => {
  if (op === "add") {
    return addSection(sections, params);
  } else if (op === "delete") {
    return deleteSection(sections, params);
  } else if (op === "edit") {
    return editSection(sections, params);
  } else if (op === "move") {
    return moveSection(sections, params);
  } else {
    throw new Error('Did not recieve a correct "op" argument');
  }
};

export const editProjectBody = async (projectSlug, op, params) => {
  try {
    const document = await db.collection("projects").doc(projectSlug).get();
    const sections = document.data().body;
    const newSections = getNewSections(op, sections, params);
    try {
      await db.collection("projects").doc(projectSlug).update({
        body: newSections,
      });
      return newSections;
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
};
