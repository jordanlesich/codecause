import React, { useEffect, useState } from "react";
import { MessageSquare, List, Users } from "react-feather";
import { useParams } from "react-router-dom";

import { db } from "../base";
import Layout from "../layouts/layout";
import TitleBar from "../components/TitleBar";
import TabMenu from "../components/tabMenu";
import Tab from "../components/tab";
import WhitePaper from "../layouts/whitePaper";

const ProjectsPage = () => {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    db.collection("projects")
      .doc(projectId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data: ", doc.data());
          setProject(doc.data());
        } else {
          console.error("Document does not exist");
        }
      })
      .catch((err) => console.error(err));
  }, [projectId]);

  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "index",
          tabButton: <List value="index" />,
          tabCard: <Tab content="Index" />,
        },
        {
          value: "chat",
          tabButton: <MessageSquare />,
          tabCard: <Tab content="Chat" />,
        },
        {
          value: "contributors",
          tabButton: <Users value="contributors" />,
          tabCard: <Tab content="Contributors" />,
        },
      ]}
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      {project !== null && (
        <>
          <TitleBar title={project.name} creator={project.creator} />
          <WhitePaper fields={project.body || null} title={project.name} />
        </>
      )}
    </Layout>
  );
};

export default ProjectsPage;
