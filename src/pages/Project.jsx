import React, { useEffect, useState } from "react";
import { MessageSquare, List, Users } from "react-feather";
import { useParams } from "react-router-dom";

import { buildComment } from "../actions/comments";
import Layout from "../layouts/layout";
import Comments from "../components/comments";
import TitleBar from "../components/TitleBar";
import TabMenu from "../components/tabMenu";
import Tab from "../components/tab";
import WhitePaper from "../layouts/whitePaper";
import { getProject } from "../actions/project";
import Button from "../components/button";

const ProjectsPage = (props) => {
  const [project, setProject] = useState(props.location.state || null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      setProject(await getProject(projectId));
    };
    if (project === null) {
      fetchProject();
    }
    return () => fetchProject;
  }, [projectId, project]);

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
          <WhitePaper project={project} />
          <Comments projRef={project.slug} />
        </>
      )}
    </Layout>
  );
};

export default ProjectsPage;
