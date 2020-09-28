import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import SignUp from "../components/signUp";
import Error from "../components/error";
import Success from "../components/success";
import Login from "../components/login";
import { Redirect } from "react-router";
// Set up individual routes paths here
// Example:
//TODO Build 404. Make default route

const LoginScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const NotLoggedIn = () => {
  const [message, setMessage] = useState(null);

  return (
    <LoginScreen>
      <Switch>
        <Route
          path="/signup"
          exact
          render={(props) => <SignUp {...props} setMessage={setMessage} />}
        />
        <Route
          path="/login"
          exact
          render={(props) => <Login {...props} setMessage={setMessage} />}
        />
        <Route
          path="/error"
          exact
          render={(props) => <Error {...props} setMessage={setMessage} />}
        />
        <Route path="/success" exact render={() => <Success />} />
        <Redirect from="/" to={`/signup`} />
        {/* <Route path="/success" exact component={<div>success</div>} />
      <Route path="/error" exact component={<div>error</div>} /> */}
        {/* <Route path="/?" default component={<div>404</div>} /> */}
      </Switch>
      {message?.type === "error" && <p>{message.error}</p>}
    </LoginScreen>
  );
};

export default NotLoggedIn;
