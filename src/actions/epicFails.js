import { v4 as uuidv4 } from "uuid";
import { db } from "../base";

//create check connected function

export const sendFail = async (type, user, data, error) => {
  const errorID = uuidv4();
  //check online, short fn if offline.

  const report = {
    data,
    type,
    displayName: user.displayName,
    user,
    time: Date.now(),
    error,
  };

  try {
    await db.collections("epicfails").doc(errorID).set(report);
    localStorage.setItem(
      "stepperBackup",
      JSON.stringify({ error: report, data })
    );
    return errorID;
  } catch (error) {
    localStorage.setItem(
      "stepperBackup",
      JSON.stringify({ error: "receipt", data })
    );
    console.error(
      "Could not submit stepper form or send error receipt. User is likely not connected to the internet. "
    );
  }
};
