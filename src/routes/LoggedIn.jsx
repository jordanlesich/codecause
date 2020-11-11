import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProjectsListing from "../pages/ProjectsListing";
import Project from "../pages/Project";
import Build from "../pages/BuildMode";
import Create from "../pages/Create";
import Apply from "../pages/Apply";

// Set up individual routes paths here
// Example:
//TODO Build 404. Make default route
const LoggedIn = () => {
  return (
    <Switch>
      <Route path="/projects" exact component={ProjectsListing} />
      <Route path="/project/:id" exact component={Project} />
      <Route path="/project/:id/apply/:step/:frame" exact component={Apply} />
      <Route path="/build/:id" exact component={Build} />
      <Route path="/create/:step/:frame" exact component={Create} />
      <Redirect from="/" to="/projects" />
      {/* <Route path="/projects" exact component={ProjectsListingPage} />
      <Route path="/projects/:projectId" exact component={ProjectPage} />
      <Route path="/users/:userId" exact component={UserPage} /> */}
    </Switch>
  );
};

export default LoggedIn;
