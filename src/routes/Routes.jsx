import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProjectsListingPage from "../pages/ProjectsListing";
import ProjectPage from "../pages/Project";
import HomePage from "../pages/Home";
import UserPage from "../pages/User";

// Set up individual routes paths here
// Example:
//TODO Build 404. Make default route
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/projects" exact component={ProjectsListingPage} />
      <Route path="/projects/:projectId" exact component={ProjectPage} />
      <Route path="/users/:userId" exact component={UserPage} />
    </Switch>
  </Router>
);

export default Routes;
