export const createMessage = (params) => {
  console.log("fired");
  for (let key in params) {
    if (typeof params[key] !== "string") {
      console.error(
        `Message Parameter ${key} expected a string. Recieved ${typeof params[
          key
        ]} instead`
      );
    }
  }
  const msg = { ...params, timeSent: Date.now() };
  return msg;
};
