import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Layout from "../layouts/layout";
import ModeManager from "../components/modeManager";
import ProjectDashboard from "../buildmodes/projectDashboard";
import EditWhitepaper from "../buildmodes/editWhitepaper";
import ManageUsers from "../buildmodes/manageUsers";
import { querySingleProjectByX, removeAlertByType } from "../actions/project";
import SideMenu from "../components/sideMenu";
import ProjectBuildPanel from "../tabs/projectBuildPanel";

const WhitePaperLayout = styled.div`
  /* margin: 0 4rem; */
`;

const ProjectsPage = () => {
  const [project, setProject] = useState(null);
  const [buildMode, setBuildMode] = useState("dashboard");

  const { id } = useParams();

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
    dashboard: (
      <ProjectDashboard
        project={project}
        removeAlert={removeAlert}
        reFetch={reFetch}
      />
    ),
    whitepaper: (
      <EditWhitepaper project={project} setBuildMode={setBuildMode} />
    ),
    users: <ManageUsers project={project} />,
  };

  return (
    <Layout sideMenu={sideMenu}>
      <WhitePaperLayout>
        <ModeManager mode={buildMode} switchMode={switchMode} modes={modes} />
      </WhitePaperLayout>
    </Layout>
  );
};

export default ProjectsPage;
