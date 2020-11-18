import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Layout from "../layouts/layout";
import ModeManager from "../components/modeManager";
import SideMenu from "../components/sideMenu";
import { getProfile } from "../actions/profiles";
import ContactUser from "../userModes/contactUser";
import AboutUser from "../userModes/aboutUser";
import UserViewPanel from "../tabs/userViewPanel";
import { DisplayLg } from "../styles/typography";

const WhitePaperLayout = styled.div`
  /* margin: 0 4rem; */
`;

const UserPage = (props) => {
  const [userData, setUserData] = useState(null);
  const [mode, setMode] = useState("aboutUser");
  const { id } = useParams();
  // const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserData(await getProfile(id));
      } catch (error) {
        console.error(error);
        // TODO 404 page and message
      }
    };
    if (userData === null) {
      fetchUserData();
    }
    return () => userData;
  }, [id, userData]);

  const switchMode = (e) => {
    setMode(e.target.value);
  };

  const sideMenu = (
    <SideMenu
      options={{
        main: <UserViewPanel user={userData} switchMode={switchMode} />,
      }}
      currentOption="main"
    />
  );

  const modes = {
    contactUser: <ContactUser />,
    aboutUser: <AboutUser user={userData} />,
  };

  return (
    <Layout sideMenu={sideMenu}>
      <WhitePaperLayout>
        <ModeManager mode={mode} switchMode={switchMode} modes={modes} />
      </WhitePaperLayout>
    </Layout>
  );
};

export default UserPage;
