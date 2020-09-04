import React, { useEffect, useState } from "react";
import app, { db } from "../base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setUser);
  }, []);

  //TODO add error handling and UI
  const signup = async (data, handleUI) => {
    const { email, password, displayName, bio } = data;
    await app.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = app.auth().currentUser;
    await currentUser.updateProfile({ displayName });
    await db.collection("users").doc(displayName.toLowerCase()).set({
      displayName,
      email,
      bio,
      id: currentUser.uid,
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
      .then(() => console.log("sign-out success"))
      .catch((err) => console.warn(err));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
