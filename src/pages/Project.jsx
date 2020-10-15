import React, { useEffect, useState } from "react";
// import { MessageSquare, List, Users } from "react-feather";
import { useParams } from "react-router-dom";

import Layout from "../layouts/layout";
import Comments from "../components/comments";
import TitleBar from "../components/TitleBar";
// import TabMenu from "../components/tabMenu";
// import Tab from "../components/tab";
import WhitePaper from "../layouts/whitePaper";
import { getProject } from "../actions/project";

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

  return (
    <Layout>
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
