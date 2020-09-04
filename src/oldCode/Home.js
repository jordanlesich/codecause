import React from "react";
import app from "base";

const Home = () => {
  const handleSignOut = () => {
    app
      .auth()
      .signOut()
      .then(() => console.log("sign-out success"))
      .catch((err) => console.warn(err));
  };

  return (
    <>
      <div>Home</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Home;
