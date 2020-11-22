import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Layout from "../layouts/layout";
import UserMainDash from "../buildmodes/userMainDash";
import ModeManager from "../components/modeManager";
import SideMenu from "../components/sideMenu";
import { useAuth } from "../Hooks/useAuth";
import UserDashPanel from "../tabs/userDashPanel";

const WhitePaperLayout = styled.div`
  /* margin: 0 4rem; */
`;

const UserDash = () => {
  const [mode, setMode] = useState("dash");
  const { user, signout } = useAuth();
  const { id } = useParams();

  //TODO consult about a better security check than this.
  //This is weak.
  if (!user || id !== user.id) {
    signout();
    //consider doing 404 instead
  }

  const switchMode = (e) => {
    setMode(e.target.value);
  };

  const sideMenu = (
    <SideMenu
      options={{
        main: <UserDashPanel user={user} switchMode={switchMode} />,
      }}
      currentOption="main"
    />
  );

  const modes = { dash: <UserMainDash user={user} /> };

  return (
    <Layout sideMenu={sideMenu}>
      <WhitePaperLayout>
        <ModeManager mode={mode} switchMode={switchMode} modes={modes} />
      </WhitePaperLayout>
    </Layout>
  );
};

export default UserDash;
