import { v4 as uuidv4 } from "uuid";
import { db } from "../base";

//create check connected function

export const sendFail = async (type, user, errorData) => {
  const errorID = uuidv4();
  const { data, error } = errorData;
  const report = {
    type,
    userID: user.id,
    time: Date.now(),
    error,
    data,
  };
  console.log(report);

  try {
    await db.collection("epicfails").doc(errorID).set(report);
    // localStorage.setItem("stepperBackup", JSON.stringify(report));
  } catch (error) {
    // localStorage.setItem("stepperBackup", JSON.stringify(report));
    console.error(error);
  }
};
