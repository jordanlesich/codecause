import React, { useEffect, useState } from "react";
// import { MessageSquare, List, Users } from "react-feather";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../Hooks/useAuth";
import useToggle from "../Hooks/useToggle";
import Layout from "../layouts/layout";
import CommentsSection from "../layouts/commentsSection";
import PaperTitle from "../layouts/paperTitle";
import PaperBody from "../layouts/paperBody";
import PaperFooter from "../layouts/paperFooter";
import { getProject } from "../actions/project";
import SideMenu from "../components/sideMenu";
import ProjectVisitorPanel from "../tabs/projectVisitor";

const WhitePaperLayout = styled.div`
  /* margin: 0 4rem; */
`;

const ProjectsPage = (props) => {
  const [project, setProject] = useState(null);
  const [projectDisplay, setProjectDisplay] = useState("paper");
  const [commentSection, toggleComments] = useToggle(false);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProject(await getProject(id));
      } catch (error) {
        console.error(error);
        setProject(null);
        //404 page and message
      }
    };
    if (project === null) {
      fetchProject();
    }
    return () => fetchProject;
  }, [id, project]);

  const isCreator = project?.creator === user.displayName;
  const isContributor = () => {
    if (!user || !project) return false;
    for (let contributor of project.contributors) {
      if (contributor.id === user.id) {
        return true;
      }
    }
    return false;
  };
  const isInvolved = isContributor() || isCreator;

  const sideMenu = (
    <SideMenu
      options={{
        main: (
          <ProjectVisitorPanel
            projectDisplay={projectDisplay}
            setProjectDisplay={setProjectDisplay}
            isInvolved={isInvolved}
            project={project}
            id={id}
          />
        ),
      }}
      currentOption="main"
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      {project ? (
        <WhitePaperLayout>
          {/* <StyledLink to="/projects" className="go-back-link">
            Back to Listing{" "}
          </StyledLink> */}
          {projectDisplay === "paper" && (
            <>
              <PaperTitle project={project} />
              <PaperBody body={project.body} />
              {commentSection ? (
                <CommentsSection projectID={project.slug} userID={user.id} />
              ) : (
                <PaperFooter
                  commentCount={project.commentCount}
                  toggleComments={toggleComments}
                  project={project}
                  isInvolved={isInvolved}
                />
              )}
            </>
          )}
        </WhitePaperLayout>
      ) : (
        <h1>Loading</h1>
      )}
    </Layout>
  );
};

export default ProjectsPage;
