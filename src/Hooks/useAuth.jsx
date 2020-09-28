import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import { getProfile, getProfileByEmail } from "../actions/profiles";
import "firebase/auth";

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// });

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = async ({ email, password, displayName }) => {
    const profile = await getProfile(displayName);
    if (profile) {
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          localStorage.setItem("coLabLocal", "true");
          return firebase
            .auth()
            .currentUser.updateProfile({
              email,
              password,
              displayName,
            })
            .then(() => {
              return { type: "success", data: response.user };
            })
            .catch(() => {
              return { type: "error", error: "failed to update user" };
            });
        })
        .catch((err) => {
          return {
            type: "error",
            error: `Could not sign up. ${err}`,
          };
        });
    } else {
      return {
        type: "error",
        data: "Could not sign up. Profile not found in db.",
      };
    }
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("coLabLocal");
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const result = await getProfileByEmail(user.email);
        if (result.error) {
          signout();
        } else {
          setUser(result);
        }
      } else {
        localStorage.removeItem("coLabLocal");
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
