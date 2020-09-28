// import React, { useEffect, useState, createContext, useContext } from "react";
// import app, { db } from "../base";

// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// });

// export const db = firebase.firestore();

// export default app;

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const auth = use

//   const [user, setUser] = useState(null);
//   // const [profile, setProfile] = useState(null);
//   const [attempts, setAttempts] = useState(0);
//   const [loginError, setloginError] = useState(false);

//   useEffect(() => {
//     app.auth().onAuthStateChanged((user) => {
//       if (user) {
//         const currentUser = app.auth().currentUser;
//         return db
//           .collection("profiles")
//           .doc(currentUser.displayName)
//           .get()
//           .then((doc) => {
//             if (doc.exists) {
//               setUser({
//                 auth: currentUser,
//                 profile: doc.data(),
//               });
//             } else {
//               console.log("couldn't find user profile");
//             }
//           });
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   const tryAgain = () => {
//     setAttempts((prevAttempt) => prevAttempt + 1);
//     if (attempts < 1) {
//       setTimeout(() => {
//         // buildUser(user);
//       }, 1000);
//     } else {
//       loginError(true);
//     }
//   };
//   //TODO add error handling and UI
//   const signup = (data, setLoading) => {
//     const { email, password, displayName, bio } = data;
//     app
//       .auth()
//       .createUserWithEmailAndPassword(email, password)

//         console.log(data);
//         const currentUser = app.auth().currentUser;
//         console.log(currentUser.uid);
//         console.log(displayName);
//         currentUser.updateProfile({ displayName });
//         db.collection("profiles")
//           .doc(currentUser.displayName)
//           .set({
//             displayName,
//             email,
//             bio: bio || "empty",
//             id: currentUser.uid,
//             starredProjects: [],
//           });
//       })

//   };

//   const login = async ({ email, password }, handleUI) => {
//     await app.auth().signInWithEmailAndPassword(email, password);
//     handleUI();
//   };

//   const logout = () => {
//     app
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(null);
//         localStorage.removeItem("coLabLocal");
//         console.log("sign-out success");
//       })
//       .catch((err) => console.warn(err));
//   };

//   const handleLocalVote = (action, vote) => {
//     let newStarredProjects = [];
//     if (action === "add") {
//       newStarredProjects = [vote, ...user.profile.starredProjects];
//     }
//     if (action === "remove") {
//       newStarredProjects = user.profile.starredProjects.filter(
//         (userVote) => userVote !== vote
//       );
//     }
//     const newUser = {
//       auth: user.auth,
//       profile: { ...user.profile, starredProjects: newStarredProjects },
//     };

//     setUser(newUser);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loginError,
//         handleLocalVote,
//         logout,
//         login,
//         signup,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
