import React, { useEffect, useState } from "react";
// import { MessageSquare, List, Users } from "react-feather";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import Layout from "../layouts/layout";
import Comments from "../components/comments";
import PaperTitle from "../layouts/paperTitle";
import PaperBody from "../layouts/paperBody";
import { getProject } from "../actions/project";
import SideMenu from "../components/sideMenu";
import ProjectVisitorPanel from "../tabs/projectVisitor";

const WhitePaperLayout = styled.div`
  margin: 0 4rem;
`;

const ProjectsPage = (props) => {
  const [project, setProject] = useState(props.location.state || null);
  const [projectDisplay, setProjectDisplay] = useState("paper");
  const { id } = useParams();
  const history = useHistory();

  console.log(project);
  useEffect(() => {
    const fetchProject = async () => {
      setProject(await getProject(id));
    };
    if (project === null) {
      fetchProject();
    }
    return () => fetchProject;
  }, [id, project]);

  const sideMenu = (
    <SideMenu
      options={{
        main: (
          <ProjectVisitorPanel
            projectDisplay={projectDisplay}
            setProjectDisplay={setProjectDisplay}
            creator={project.creator}
            contributors={project.contributors}
            awards={project.awards}
          />
        ),
      }}
      currentOption="main"
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      {project !== null && (
        <WhitePaperLayout>
          {/* <StyledLink to="/projects" className="go-back-link">
            Back to Listing{" "}
          </StyledLink> */}
          {projectDisplay === "paper" && (
            <>
              <PaperTitle project={project} />
              <PaperBody body={project.body} />
            </>
          )}
        </WhitePaperLayout>
      )}
    </Layout>
  );
};

export default ProjectsPage;
