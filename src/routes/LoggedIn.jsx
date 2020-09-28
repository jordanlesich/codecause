import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../pages/Home";

// Set up individual routes paths here
// Example:
//TODO Build 404. Make default route
const LoggedIn = () => {
  return (
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Redirect from="/" to="/home" />
      {/* <Route path="/projects" exact component={ProjectsListingPage} />
      <Route path="/projects/:projectId" exact component={ProjectPage} />
      <Route path="/users/:userId" exact component={UserPage} /> */}
    </Switch>
  );
};

export default LoggedIn;
