import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import { db } from "../base";

export const createProject = (stepperData, user, finishedFn, loadingFn) => {
  const params = {
    id: uuidv4(),
    name: stepperData[0].answer,
    description: stepperData[1].answer,
    creator: user.displayName,
    timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
    problem: stepperData[2].answer,
    solution: stepperData[3].answer,
    experience: stepperData[4].answer,
    mvp: stepperData[5].answer,
    causeTag: stepperData[6].answer,
    solutionTag: stepperData[7].answer,
    skillTags: stepperData[8].answer.split(" "),
    details: stepperData[9].answer,
  };

  db.collection("projects")
    .doc(params.id)
    .set(params)
    .then(() => {
      console.log(`${params.name} posted successfully`);
      finishedFn();
    })
    .catch((err) => {
      console.err(err);
    });
};
