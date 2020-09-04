import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, Tag, Search } from "react-feather";

import { db } from "../base";
import TabMenu from "../components/tabMenu";
import Tab from "../components/tab";
import Layout from "../layouts/layout";
import ProjectListItem from "../components/projectListItem";

import { getColor } from "../helpers/palette";

const ListingSpace = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 2.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .listing-section {
    position: relative;
    z-index: 0;
    .listing-title {
      font-size: 3rem;
      margin-bottom: 2.5rem;
      font-weight: 300;
    }
  }
  /* .tag-section {
    margin-right: 6vw;
    background-color: ${getColor(
    "lightgrey"
  )};

    aside {
      height: 20rem;
      border-radius: 4px;
      width: 10rem;
      border: 1px solid ${getColor(
    "lightBorder"
  )};
    }
  } */
`;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  console.log(projects);
  useEffect(() => {
    db.collection("projects")
      .get()
      .then((querySnapshot) => {
        setProjects(querySnapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "index",
          tabButton: <Search value="search" />,
          tabCard: <Tab content="Search For Projects" />,
        },
        {
          value: "chat",
          tabButton: <Tag value="tags" />,
          tabCard: <Tab content="Search By Tags" />,
        },
        {
          value: "contributors",
          tabButton: <Heart value="likedProjects" />,
          tabCard: <Tab content="Liked Projects" />,
        },
      ]}
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      <ListingSpace>
        {/* <section className="tag-section">
          <aside className="worker-tags tags">
            <p>Filter By Skill Set</p>
          </aside>
          <aside className="project-tags tags">
            <p>Filter By Project Type</p>
          </aside>
        </section> */}
        <section className="listing-section">
          <h1 className="listing-title">{projects.length} Active Projects</h1>
          <ul>
            {projects &&
              projects.map((project) => {
                return <ProjectListItem project={project} key={project.id} />;
              })}
          </ul>
        </section>
      </ListingSpace>
      {/* <button onClick={getProjects}> GET ASYNC PROJECTS </button> */}
    </Layout>
  );
};

export default ProjectsPage;
