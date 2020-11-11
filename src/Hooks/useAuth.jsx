import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import { getProfileByEmail } from "../actions/profiles";
import "firebase/auth";

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
        // setUser(response.user);
        localStorage.setItem("coLabLocal", "true");
        return response.user;
      })
      .catch((err) => ({ type: "error", error: err }));
  };

  const signup = async (email, password, displayName) => {
    return firebase
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
            return response.user;
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
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

  const handleLocalVote = (action, slug) => {
    let newVoteObj = {};
    if (action === "add") {
      newVoteObj = { slug, ...user.votedProjects };
    }
    if (action === "remove") {
      for (let v in user.votedProjects) {
        if (v !== slug) {
          newVoteObj[v] = true;
        }
      }
    }
    setUser({
      ...user,
      votedProjects: newVoteObj,
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
        if (!result) {
          console.error(result);
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
    handleLocalVote,
  };
}
