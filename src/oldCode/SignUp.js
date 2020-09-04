import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/authContext";
import { withRouter } from "react-router";
import app from "base";

const SignUp = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const handleSignUp = useCallback(
  //   async (event) => {
  //     event.preventDefault();
  //     const { email, password } = event.target.elements;
  //     try {
  //       await app
  //         .auth()
  //         .createUserWithEmailAndPassword(email.value, password.value);
  //       history.push("/");
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   [history]
  // );

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password);
      const user = app.auth().currentUser;
      user
        .updateProfile({
          displayName: inputs.name,
        })
        .then(history.push("/"))
        .catch((err) => console.warn(err));
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(currentUser);
  return (
    <div>
      {currentUser ? (
        <h1>{currentUser.displayName}</h1>
      ) : (
        <>
          {" "}
          <h1>Sign up</h1>
          <form onSubmit={handleSignUp}>
            <label>
              UserName
              <input
                name="name"
                type="name"
                value={inputs.name}
                placeholder="UserName"
                onChange={handleChange}
                onBlur={handleChange}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={inputs.email}
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleChange}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={inputs.password}
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleChange}
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(SignUp);
