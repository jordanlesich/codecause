import React, { useEffect, useState } from "react";
// import { MessageSquare, List, Users } from "react-feather";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// import { useAuth } from "../Hooks/useAuth";
import Layout from "../layouts/layout";
import BuildModeManager from "../buildmodes/buildModeManager";
import ProjectDashboard from "../buildmodes/projectDashboard";
import EditWhitepaper from "../buildmodes/editWhitepaper";
import ApplicationInbox from "../buildmodes/applicationInbox";
import ProjectSettings from "../buildmodes/projectSettings";
import { querySingleProjectByX, removeAlertByType } from "../actions/project";
import SideMenu from "../components/sideMenu";
import ProjectBuildPanel from "../tabs/projectBuildPanel";
import Button from "../components/button";

const WhitePaperLayout = styled.div`
  /* margin: 0 4rem; */
`;

const ProjectsPage = (props) => {
  const [project, setProject] = useState(null);
  const [buildMode, setBuildMode] = useState("dashboard");
  const { id } = useParams();
  // const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProject(await querySingleProjectByX("id", id));
      } catch (error) {
        console.error(error);
        setProject(null);
        // TODO404 page and message
      }
    };
    if (project === null) {
      fetchProject();
    }
    return () => fetchProject;
  }, [id, project]);

  const reFetch = () => {
    setProject(null);
  };
  const switchMode = (e) => {
    setBuildMode(e.target.value);
  };
  const removeAlert = async (alertType) => {
    try {
      const newProj = await removeAlertByType(alertType, project);
      setProject(newProj);
    } catch (error) {
      console.error(error);
    }
  };

  const sideMenu = (
    <SideMenu
      options={{
        main: (
          <ProjectBuildPanel
            switchMode={switchMode}
            project={project}
            id={id}
          />
        ),
      }}
      currentOption="main"
    />
  );

  const modes = {
    dashboard: <ProjectDashboard project={project} removeAlert={removeAlert} />,
    whitepaper: <EditWhitepaper />,
    settings: <ProjectSettings />,
  };

  return (
    <Layout sideMenu={sideMenu}>
      <WhitePaperLayout>
        <BuildModeManager
          mode={buildMode}
          switchMode={switchMode}
          modes={modes}
        />
      </WhitePaperLayout>
    </Layout>
  );
};

export default ProjectsPage;
