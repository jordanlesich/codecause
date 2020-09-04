import React, { useState, useEffect } from "react";

import { db } from "./base";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    db.collection("projects")
      .get()
      .then((querySnapshot) => {
        setProjects(querySnapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  console.log(projects);
  return projects ? <h1>Projects are in!</h1> : <h1>No Projects Loaded</h1>;
};

export default Projects;
