import React, { useEffect, useState } from "react";
import app, { db } from "../base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const buildUser = async (user) => {
      const currentUser = app.auth().currentUser;
      db.collection("profiles")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser({
              auth: user,
              profile: doc.data(),
            });
          } else {
            console.log("user doesn't yet have a profile account");
          }
        })
        .catch((err) => console.error(err));
    };
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        buildUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  //TODO add error handling and UI
  const signup = async (data, handleUI) => {
    const { email, password, displayName, bio } = data;
    await app.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = app.auth().currentUser;
    await currentUser.updateProfile({ displayName });
    await db
      .collection("profiles")
      .doc(currentUser.uid)
      .set({
        displayName,
        email,
        bio: bio || "empty",
        id: currentUser.uid,
        starredProjects: [],
      });
    handleUI();
  };
  const login = async ({ email, password }, handleUI) => {
    await app.auth().signInWithEmailAndPassword(email, password);
    handleUI();
  };

  const logout = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        console.log("sign-out success");
      })
      .catch((err) => console.warn(err));
  };

  const handleLocalVote = (action, vote) => {
    let newStarredProjects = [];
    if (action === "add") {
      newStarredProjects = [vote, ...user.profile.starredProjects];
    }
    if (action === "remove") {
      newStarredProjects = user.profile.starredProjects.filter(
        (userVote) => userVote !== vote
      );
    }
    const newUser = {
      auth: user.auth,
      profile: { ...user.profile, starredProjects: newStarredProjects },
    };

    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLocalVote,
        logout,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
