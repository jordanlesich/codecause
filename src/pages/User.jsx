import React, { useState, useEffect } from "react";
import { db } from "../base";
import { MessageCircle, BarChart2, Briefcase } from "react-feather";
import { useParams } from "react-router-dom";

import Layout from "../layouts/layout";
import TitleBar from "../components/TitleBar";
import TabMenu from "../components/tabMenu";
import Tab from "../components/tab";
import WhitePaper from "../layouts/whitePaper";
// import { getUser } from "../actions/user";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data: ", doc.data());
          setUser(doc.data());
        } else {
          console.error("Document does not exist");
        }
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "chat",
          tabButton: <MessageCircle value="msg" />,
          tabCard: <Tab content="Message User" />,
        },
        {
          value: "index",
          tabButton: <BarChart2 value="award" />,
          tabCard: <Tab content="See user's stats" />,
        },
        {
          value: "contributors",
          tabButton: <Briefcase value="" />,
          tabCard: <Tab content="Active Projects" />,
        },
      ]}
    />
  );

  console.log(user);
  return (
    <Layout sideMenu={sideMenu}>
      {user != null && <TitleBar title={user.name} subtitle={"newUi"} />}
      {/* <WhitePaper fields={user} /> */}
    </Layout>
  );
};

export default UserPage;
